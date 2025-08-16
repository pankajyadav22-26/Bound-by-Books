from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests
import numpy as np
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://boundbybooks29.netlify.app"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load env vars
BACKEND_URL = os.getenv("BACKEND_BASE_URL")
AUTHOR_WEIGHT = float(os.getenv("AUTHOR_WEIGHT", 1.0))
LANGUAGE_WEIGHT = float(os.getenv("LANGUAGE_WEIGHT", 1.0))
SERVICE_TOKEN = os.getenv("SERVICE_TOKEN", "pankaj123456")

# Globals
books, book_ids, tfidf_matrix, vectorizer = [], [], None, None


def train_model():
    global books, book_ids, tfidf_matrix, vectorizer

    resp = requests.get(f"{BACKEND_URL}/get-all-books")
    resp.raise_for_status()
    data = resp.json()

    books = data.get("data", [])
    book_ids = [str(b["_id"]) for b in books]

    corpus = []
    for b in books:
        text = f"{b.get('title','')} {b.get('description','')}"
        text += " " + (b.get("author","") * int(AUTHOR_WEIGHT))
        text += " " + (b.get("language","") * int(LANGUAGE_WEIGHT))
        corpus.append(text)

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(corpus)


@app.on_event("startup")
def startup_event():
    train_model()


@app.get("/")
def root():
    return {"status": "ok", "books": len(books)}


@app.get("/train")
def retrain():
    train_model()
    return {"status": "retrained", "books": len(books)}


@app.get("/recommend/{user_id}")
def recommend(user_id: str, top_n: int = 5):
    if tfidf_matrix is None:
        return {"error": "Model not trained yet"}

    headers = {"x-api-key": SERVICE_TOKEN, "id": user_id}  # ✅ send both

    # ---- Fetch orders ----
    resp = requests.get(f"{BACKEND_URL}/get-order-history", headers=headers)
    resp.raise_for_status()
    orders = resp.json().get("data", [])
    order_book_ids = [str(order["book"]["_id"]) for order in orders if "book" in order]

    # ---- Fetch favourites ----
    resp = requests.get(f"{BACKEND_URL}/get-favourite-books", headers=headers)
    resp.raise_for_status()
    favs = resp.json().get("data", [])
    fav_book_ids = [str(book["_id"]) for book in favs]

    seed_ids = set(order_book_ids + fav_book_ids)

    if not seed_ids:
        return {"recommendations": []}

    seed_indices = [book_ids.index(bid) for bid in seed_ids if bid in book_ids]
    if not seed_indices:
        return {"recommendations": []}

    sim_matrix = cosine_similarity(tfidf_matrix[seed_indices], tfidf_matrix)
    scores = sim_matrix.mean(axis=0)

    ranked_indices = scores.argsort()[::-1]
    rec_ids = []
    for idx in ranked_indices:
        bid = book_ids[idx]
        if bid not in seed_ids:
            rec_ids.append(bid)
        if len(rec_ids) >= top_n:
            break

    return {"recommendations": rec_ids}
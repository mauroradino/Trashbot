from fastapi import FastAPI
from pydantic import BaseModel
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from uuid import UUID

load_dotenv()

url = os.getenv("VITE_SUPABASE_URL")
key = os.getenv("VITE_SUPABASE_ANON_KEY")

supabase: Client = create_client(url, key)
app = FastAPI()

# Modelo del producto
class Producto(BaseModel):
    nombre_producto: str
    id_usuario: UUID

@app.post("/nuevo_producto")
def nuevo_producto(producto: Producto):
    response = supabase.table("ListaDeCompras").insert([{
        "nombre_producto": producto.nombre_producto,
        "id_usuario": str(producto.id_usuario)
    }]).execute()

    return response.data

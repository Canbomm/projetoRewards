import sqlite3
import random
import time
import pyperclip
import os

def runSQL(query,params=()):
  with sqlite3.connect("database.sqlite3") as conn:
    cursor = conn.cursor()
    cursor.execute(query,params)

    if query.strip().upper().startswith("SELECT"):
      return cursor.fetchall()
    else:
      conn.commit()
      return cursor.rowcount
    
def popularPesquisas():
  with open("Pesquisas.txt", encoding="UTF-8") as file:
    print("Populando pesquisas")
    for linha in file:
      runSQL(insert_pesquisa,[linha.rstrip()])
    print("Pesquisas populado")

def consoleTimer(seconds):
  print(f"Timer: {seconds}... ",end='',flush=True)
  time.sleep(1)
  while seconds > 1:
    seconds -= 1
    print(f"{seconds}... ",end='',flush=True)
    time.sleep(1)
  print("Done!")

def consoleClear():
  os.system('cls' if os.name == 'nt' else 'clear')

create_pesquisas = """
CREATE TABLE IF NOT EXISTS Pesquisas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pesquisa TEXT
)
"""

insert_pesquisa = """
INSERT INTO Pesquisas (pesquisa) VALUES (?)
"""

# print(runSQL(create_pesquisas))
# popularPesquisas()
search_amount = 1
pesquisas = max(int(input("Total de pesquisas para gerar: ")),1)
while search_amount <= pesquisas:
  indrand = random.randint(1,3350)
  pesquisa = runSQL(f"SELECT * FROM Pesquisas WHERE id = {indrand}")[0][1]
  pyperclip.copy(pesquisa)
  consoleClear()
  print(f"Pesquisa {search_amount} de {pesquisas}: {pesquisa}")
  consoleTimer(8)
  search_amount += 1

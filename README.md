# VideoBox
A ideia inicial é criar uma espécie de repositório de videos.

---

# 🧭 Guia de Git do Projeto

## 📌 Estrutura de Branches

### Branches principais:

* **`main`** → código estável (produção)
* **`dev`** → integração e testes (pré-release)

### Branches de domínio:

* `nginx`
* `backend`
* `frontend`
* `process`
* `videos-repo`
* `streaming-repo`

> Cada branch de domínio corresponde à pasta do mesmo nome no repositório.
> Ex.: branch `backend` = mexe só em `/backend`.

---

# 🔁 Fluxo de Trabalho

### 1) Desenvolvimento diário

Cada dev trabalha **sempre** na branch do seu domínio.

Exemplo:

```bash
git checkout backend
```

Faz as alterações → adiciona → commita:

```bash
git add .
git commit -m "descrição clara do que foi feito"
git push origin backend
```

### 2) Pull Request para a `dev`

Terminou algo?
Abra um PR **da sua branch de domínio → para a branch `dev`**.

A `dev` é onde tudo se junta para ser testado.

### 3) Release para a `main`

Quando a `dev` estiver estável, abrimos um PR:

```
dev → main
```

Isso vira a versão de produção.

---

# 🔄 Mantendo sua branch atualizada

Antes de começar o dia, sincronize sua branch de domínio com a `dev`:

```bash
git checkout backend
git pull origin dev
```

Se der conflito:

```bash
# resolve no editor
git add .
git commit -m "fix: resolvendo conflitos"
git push origin backend
```

---

# 🛡️ Regras Importantes

1. ❌ **Nunca comitar direto na `main`**
2. ❌ **Evitar comitar direto na `dev`** (quase sempre via PR)
3. ✔️ Trabalhe **somente** na branch do seu domínio
4. ✔️ Sempre faça PR → revisão → merge
5. ✔️ Atualize sua branch com a `dev` regularmente

---

# 🧱 Estrutura do Projeto

Cada diretório corresponde a um domínio e tem sua própria branch:

```
/nginx
/backend
/frontend
/process
/videos-repo
/streaming-repo
```

Isso mantém o escopo isolado e reduz conflitos.

---

# 🧭 Resumo (versão turbo)

```
(branch domínio)
   ↓ PR
dev
   ↓ PR (release)
main
```

E no dia a dia:

```
checkout → code → commit → push → PR
```

---
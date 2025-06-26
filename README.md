# 🧩 TeamTask - Application MERN avec Redux et gestion multi-utilisateurs 

TeamTask est une application MERN full-stack pour gérer les tâches d'équipe avec un accès basé sur les rôles. Les managers peuvent assigner des tâches, les utilisateurs peuvent les consulter et les mettre à jour. Construite avec React (Vite), Redux Toolkit, Express et MongoDB.
---

##  Fonctionnalités

- ✅ JWT Authentication (inscription, connexion)
- ✅ Accès basé sur les rôles (Manager & User)
- ✅ CRUD des tâches avec affectation
- ✅ Gestion d’état avec Redux Toolkit
- ✅ Backend MongoDB + Mongoose

---

##  Instructions d'installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/yourusername/TeamTask.git
cd TeamTask
```
### 2. Configuration du backend

```bash
cd Back-TeamTask
npm install
```
#### Configuration de l’environnement
#### Créez un fichier .env dans Back_end/ basé sur .env.example :

```bash
PORT=5000
DATABASE=mongodb+srv://<username>:<password>@cluster0.mongodb.net/teamtask
DATABASE_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key
```

#### Run the backend

```bash
npm run dev
```

### 3. Configuration du frontend

```bash
cd ../Front-TeamTask
npm install
npm run dev
```
##### App will run at: http://localhost:5173

## Rôles et fonctionnalités : 
Login/Signup: accès via /login ou /signup.

### Manager:

Dashboard: Voir les statistiques des tâches (à faire, en cours, terminé) et des utilisateurs sur /dashboard.

Task Management: Créer/filtrer les tâches sur /tasks.
Remarque : si aucun utilisateur n’est sélectionné lors de la création d’une tâche, elle sera assignée automatiquement au manager.

User Management: Créer des utilisateurs ou les promouvoir en manager sur /admin.

### User: 

Voir/modifier (statut) ou supprimer les tâches sur /my-tasks.

Remarque : un manager peut aussi avoir des tâches et les voir/modifier (statut) ou les supprimer via /my-tasks.

## API Endpoints :
```bash
POST /auth/login: Authentifier un utilisateur.
POST /auth/signup: Inscrire un utilisateur.
POST /auth/create-user:  Créer un utilisateur (manager uniquement).
GET /tasks/all-tasks: Récupérer toutes les tâches (manager uniquement).
GET /tasks/my-tasks: Récupérer les tâches de l'utilisateur connecté.
POST /tasks/createTask: Créer une tâche (manager uniquement).
PUT /tasks/edit/:id: Modifier le statut d'une tâche.
DELETE /tasks/delete/:id: Supprimer une tâche.
GET /users/all: Récupérer tous les utilisateurs (manager uniquement).
GET /users/user/:id: Récupérer un utilisateur par ID (manager uniquement).
PUT /users/updateUser/:id:  Mettre à jour le rôle d'un utilisateur(seulement d'un User vers Manager) (manager uniquement).
GET /users/me: Récupérer les infos de l'utilisateur connecté.
```

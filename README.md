# FullyLife

FullyLife est une application web de **gestion quotidienne de routines**, suivie d’objectifs et de progression hebdomadaire. Elle permet de suivre une routines quotidienne, de marquer les tâches comme complétées, et d’analyser les statistiques à travers un tableau de bord interactif.

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités détaillées](#fonctionnalités-détaillées)
- [Screenshots](#screenshots)

---

## Fonctionnalités

- Gestion des **routines quotidiennes** avec horaires et descriptions.  
- Marquer une tâche comme **complétée** (`completed`).  
- Visualiser les routines par **semaine** et par **jour**.  
- Dashboard interactif avec :  
  - Routines totales  
  - Routines complétées  
  - Objectifs atteints par jour  
  - Graphique hebdomadaire des routines complétées  
- Navigation par semaine avec menu interactif.
- Design moderne en **dark mode**, type Trello, responsive.  
- Base de données pré-remplie avec **seed** pour 8 semaines de routines.  

---

## Stack technique

- **Front-end :** React, TypeScript, Recharts, CSS moderne  
- **Back-end :** Ruby on Rails API  
- **Base de données :** PostgreSQL  
- **Communication front-back :** Axios pour les requêtes HTTP  
- **Gestion de l’état :** Hooks React (`useState`, `useEffect`)  

---

## Installation

### Prérequis

- Node.js (v18+)  
- Ruby (v3+) et Rails (v7+)  
- PostgreSQL (v14+)  

### Cloner le projet

```bash
git clone https://github.com/Hassyunity/FullyLife.git
cd fullylife

```
Installer le back-end (Rails API)

``` bash
cd fully_service
bundle install
rails db:create
rails db:migrate
rails db:seed
rails s

```
L’API sera accessible sur : http://127.0.0.1:3000/api/v1/suivis

Installer le front-end (React)

``` bash
cd fullylife
npm install
npm start
```
L’application React sera accessible sur : http://localhost:3001 (ou port par défaut 3000 si Rails sur autre port).

Fonctionnalités détaillées
Suivis / Routines

Affichage de toutes les routines par semaine et jour.

Marquer une routine comme completed via checkbox.

Les jours entièrement complétés sont comptabilisés dans les Objectifs atteints.

Support pour 8 semaines de suivi.

Dashboard

Cartes résumé :

Routines totales : nombre total de tâches dans la semaine sélectionnée

Routines terminées : tâches complétées sur le total

Objectifs atteints (Jours) : nombre de jours entièrement complétés

Graphique barre hebdomadaire : routines complétées par jour.

Menu interactif pour sélectionner la semaine à afficher.

UI / UX

Design moderne type Trello avec colonnes verticales par jour.

Mode sombre complet (dark mode) pour confort visuel.

Responsive pour mobile et tablette.

Animations sur cartes : hover, rotation légère et zoom.

## C'etait Hassy, fullstack Développeur.

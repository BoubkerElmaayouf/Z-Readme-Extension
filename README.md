# GraphQL Profile Page Project

## Project Overview

This project focuses on building a personalized profile page using the GraphQL query language.  The goal is to consolidate learning of GraphQL, API interaction, authentication (JWT), UI/UX design, and web hosting.  Students will query a provided GraphQL endpoint to retrieve their own data and display it in a visually appealing and informative manner.  The project necessitates the creation of a login page and the implementation of at least two SVG-based statistical graphs to visualize user data.

## Project Purpose

The primary purpose is to provide a hands-on learning experience with GraphQL, encompassing various aspects of web development. Students will gain practical skills in:

* **GraphQL Querying:**  Formulating and executing GraphQL queries to retrieve specific data from a remote API.
* **API Interaction:**  Making requests to a GraphQL endpoint and handling responses.
* **JWT Authentication:**  Implementing secure authentication using JSON Web Tokens.
* **UI/UX Design:**  Creating a user-friendly and visually appealing interface.
* **Data Visualization:**  Generating statistical graphs using SVG to represent user data effectively.
* **Web Hosting:**  Deploying the completed project to a hosting platform (e.g., GitHub Pages, Netlify).

## Key Project Points

This project involves several key components:

**1. Login Page:**

*   Implements authentication using JWT obtained via a POST request to a provided signin endpoint (`https://learn.zone01oujda.ma/api/auth/signin`).
*   Supports login using both username/password and email/password combinations.
*   Displays appropriate error messages for invalid credentials.
*   Includes a logout functionality.

**2. GraphQL Queries:**

*   Utilizes the provided GraphQL endpoint (`https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql`) to fetch user data.
*   Employs various query types: simple queries, nested queries, and queries with arguments.
*   Uses Bearer authentication with the JWT to secure API access.
*   Retrieves data from multiple tables (user, transaction, progress, result, object) as needed.

**3. Profile Page UI:**

*   Displays at least three pieces of user information (e.g., basic identification, XP amount, grades, audits, skills).
*   Includes a dedicated section for statistical graphs (minimum two).
*   Graphs are implemented using SVG, potentially incorporating interactive or animated elements.
*   Adheres to good UI/UX design principles.

**4. Statistical Graphs (SVG):**

*   Minimum of two graphs visualizing user data.  Suggested examples include:
    * XP earned over time.
    * XP earned per project.
    * Audit ratio.
    * Project pass/fail ratio.
    * Piscine (JS/Go) statistics.
    * Pass/fail ratio for exercises.
    * Attempts per exercise.

**5. Web Hosting:**

*   Deploys the completed project to a chosen hosting platform (e.g., GitHub Pages, Netlify).

**Data Tables:**  The project utilizes data from several tables accessible via the GraphQL API: `user`, `transaction`, `progress`, `result`, and `object`.  Detailed descriptions of these tables and their columns are provided in the original document.  Examples of GraphQL queries are also included to illustrate data retrieval.

## Author Information

This project was developed as an educational module.  While the original author is not explicitly stated, the project is attributed to the INTRA OUJDA MODULE GRAPHQL team.  The Git repository is located at: `https://learn.zone01oujda.ma/git/belmaayo/graphql`


## Peer Audits

This project requires 5 peer audits for completion.  The following individuals have already provided audits: aayyada, iichi, ranniz, abaid, mlarbi.

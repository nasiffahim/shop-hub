# Next.js Product Management App

## Project Description
This is a full-stack web application built with Next.js 15 (App Router) that features public and protected routes. It uses NextAuth.js for robust authentication, allowing users to browse products and access a protected dashboard to add new ones after logging in. The application follows a modern architecture with server components and API routes.

Core Features
Public Landing Page (/): Introduces the application and highlights key products.

Public Product Pages (/products and /products/[id]): Allows anyone to view a list of products and their details.

Authentication (/login): Secure user authentication using NextAuth.js.

Protected Dashboard (/dashboard/add-product): A gated page where authenticated users can add new products via a form.

Setup & Installation
Follow these steps to get the project up and running on your local machine.

Prerequisites
Ensure you have the following installed:

Node.js (LTS version recommended)

npm or yarn

1. Clone the Repository

Bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>

2. Install Dependencies
Install all the required packages using npm:

Bash
npm install

3. Run the Development Server
Start the application with the development server:

Bash
npm run dev

The application will be available at http://localhost:3000.

Route Summary
The application is structured using Next.js 15's App Router, with a clear separation of public and protected routes.

**/**: Public - The main landing page of the application, featuring a hero section, product highlights, and a footer.

**/**login**: Public - The login page for users to authenticate using NextAuth.js.

**/**products**: Public - Displays a list of all available products.

**/**products**/[id]: Public - Shows the detailed view for a single product.

**/**dashboard**/**add-product**: Protected - A secured route accessible only to authenticated users. This page contains a form for adding new products.

**/**api**/**auth**/...: Protected - The API routes handled by NextAuth.js for authentication purposes.

**/**api**/**products**: Protected - The API route handler for creating new products.

/products/[id] → Product details page (public)

/dashboard/add-product → Add new product (protected)

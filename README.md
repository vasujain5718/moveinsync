Fleet Alert Dashboard
Overview

This is a basic Fleet Alert Monitoring Dashboard built using React.
The application displays alert data in a tabular format and allows simple interaction such as searching, sorting, and resolving alerts.

The goal of this project is to demonstrate core UI rendering and state management concepts in React.

Implemented Features
1. Alert Summary

Displays count of:

Open alerts

Escalated alerts

Resolved alerts

Updates dynamically when an alert is resolved.

2. Alerts Table

Displays alert details including:

ID

Source

Severity

Status

Driver

Vehicle

Clickable rows to view alert details.

3. Search Functionality

Search alerts by:

Driver name

Alert ID

4. Sorting

Sortable columns:

ID

Severity

Status

Clicking a column toggles ascending/descending order.

5. Alert Detail View

Displays selected alert information.

Includes a Resolve Alert button.

Status updates to "RESOLVED" when clicked.

Technology Used

React (Vite setup)

JavaScript

Basic inline styling (no external UI libraries)

How to Run
npm install
npm run dev
Notes

Alert data is currently stored locally in the project.

The focus of this implementation is on basic functionality and UI interaction.

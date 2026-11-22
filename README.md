# JobNest – Static Demo

A static (HTML, CSS and JavaScript only) preview of the **JobNest Job Portal**, built for GitHub Pages.

The full JobNest system is a PHP & MySQL application and cannot run on GitHub Pages. This demo recreates its design and main screens using **fictional sample data**:

| Page | File |
|---|---|
| Home | `index.html` |
| About Us | `about.html` |
| Job Listings (search & filters) | `jobs.html` |
| Job Details | `job-details.html?id=1` |
| Login (Job Seeker / Company / Admin) | `login.html` |
| Register (Job Seeker / Company) | `register.html` |
| Company Dashboard | `company-dashboard.html` |
| Admin Dashboard | `admin-dashboard.html` |

## Demo limitations
- No real authentication: the login and register forms check nothing and store nothing.
- No real applications, CV uploads, emails or payments.
- Changes you make on the dashboards (status updates, approvals, new job posts) live on the page only and disappear when you reload.
- All companies, people, emails and numbers are fictional.

## Run locally
Open `index.html` in a browser, or serve the folder with any static server. All paths are relative, so it works from any subfolder.

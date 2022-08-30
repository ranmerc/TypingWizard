# Typing Wizard

This is a PHP project made by [Anish Nair](https://github.com/Meep2001), [Hradyesh Singh](https://github.com/Happy-web-tech) and [Kamran Ansari](https://github.com/ranmerc) for TY BSc CS (2020-21) at Fergusson College, Pune.

You can find the [project report here](./AG15-project-report.pdf) and the [presentation here](./AG15-presentation.pdf).

Note - This project is not responsive and is best optimized for Firefox on a 720p screen.

## Hosting Notes

Typing Wizard uses PHP and PostgreSQL.

For database creation run these two files in order - first, [databaseCreation.sql](./Database/databaseCreation.sql) to create the required tables. Then [insert.sql](./Database/insert.sql), to insert the data into those tables.

You can name your database anything you want but you should provide the `DATABASE_URL` environment variable in your PHP host environment.

## Live Link and some History

Originally both PHP and PostgreSQL were hosted on Heroku ([here](https://typing-wizard.herokuapp.com/)) but since Heroku will soon be [deprecating their free tier](https://devcenter.heroku.com/changelog-items/2461) we have now switched to [render](https://render.com/) for PHP and [Supabase](https://supabase.com/) for PostgreSQL.

[Current Live Project Link](https://typing-wizard.onrender.com/)

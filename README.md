# Rjjenda - dependencies updated and dockerized

Brought to you by Thomas Zhou (tzhou@commschool.org)

## Building the Rjjenda Image

````
docker build -t rjjenda
````

## Running Rjjenda for the first time

### Initializing database

````
$ psql postgres

postgres=# CREATE DATABASE rjjenda;
postgres=# CREATE ROLE rjjenda WITH LOGIN;
postgres=# GRANT ALL ON DATABASE "rjjenda" TO rjjenda;
postgres=# \q
````

### Initial setup commands

````bash
npm run compile
init-scripts/sync-database.js
init-scripts/import-students-teachers.js csvFile # provide path to users CSV file
init-scripts/set-admin.js username # provide username of initial admin
````

## Restarting Rjjenda

Run `docker compose up -d` or `docker compose restart -d` depending on your case.

## Stopping Rjjenda

Run `docker compose down`.

Everything else is easier to accomplish through the admin interface.

## Compiling the server-side TypeScript and starting the server

````
npm start
````

## Building the client-side bundle
````
npm run build
````

## Using HTTPS

To enable HTTPS, you first need an SSL certificate.
The certificate will include a private key file (named something like `key.pem`) and a certificate file (something like `cert.pem`).
Update `settings.json` with the paths to these files:
```json
{
	"emailDomain": "...",
	"https": {
		"keyFile": "key.pem",
		"certFile": "cert.pem"
	},
	"hostDomain": "...",
	"port": 443
}
```
You may also want to change the port that the server runs on; the default for HTTPS is 443.

To disable HTTPS, set `"https": null`.

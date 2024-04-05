# FinBuddy

personal financial management companion.

## Environment setup

### backend

#### python virtual environment

This is recommended but not necessary:

```bash
# Create a virtual python environment
# Make suer you have installed virtualenv correctly
python -m venv .venv
# Activate the virtual environment
source .venv/bin/activate
# you can check if it works correctly by running:
where python
# If it turns out to be ${pwd}/.venv/bin/python
# that means you activate the enviornment successfully!

# deactivate the virtual environment by running:
deactivate
```

#### Install dependencies

```bash
pip install -r backend/requirements.txt
```

#### Setup pre-commit

```bash
pre-commit install # first use
pre-commit install --overwrite
```

#### Setup env

```bash
copy .default.env .env
```

#### Start development docker services

```bash
docker compose up -d
```

#### Start docker services

```bash
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

## Linter & Formatter

We use pre-commit library to check each commit,
please make sure your pre-commit can work after environment setup

You can test if the pre-commit works correctly by running pre-commit command manually:

```bash
pre-commit run
```

### backend

- linter: flake8
- formatter: black

## Auth

use JWT token

put the below in header to get authed

```
{
  "Authorization": "JWT ${token}"
}
```

## Generating Fake Data

To populate your local development environment with fake data, you can use the custom management commands.

```bash
docker-compose exec backend python manage.py generate_users <number_of_users> [--seed <seed_number>]

docker-compose exec backend python manage.py generate_categories <number_of_transactions> [--seed <seed_number>]

docker-compose exec backend python manage.py generate_transactions <number_of_transactions> [--seed <seed_number>]
```

- <number_of_users>: The number of fake users you want to create.
- --seed <seed_number>: Optional. Use this to produce a consistent set of users for testing.

--seed argument is particularly useful for creating predictable data for automated tests or when debugging specific scenarios.

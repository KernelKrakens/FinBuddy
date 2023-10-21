# FinBuddy

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

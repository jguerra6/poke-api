# Pokemon API

Pokemon API is a NodeJS-based API that gives you useful information to compare Pokemons for battles and know their common moves. You can test our hosted version [here](http://169.51.200.120:31159/api/v1/).

## Installation

### Requirements

- **NodeJS:** This API is based on node 17, hence this version is recommended but others might work as well. [Get Node](https://nodejs.org/en/).
  \*This project contains a **Makefile** with commands to build a Docker image, if you are interested on deploying building your own image [Docker](https://docs.docker.com/get-docker/) is needed too.

Clone the repo

```
git clone https://github.com/jguerra6/poke-api.git
```

## Usage

1. To run a local copy of the API you need to go to the main folder and install all the npm modules

```
npm install
```

1. Run the API. By default it will use PORT 8080, if you want to use another one, please update the `.env` file on the `secrets` folder.

```
npm start
```

If you want to run it on dev mode (automatically reloading the app on save) you must use `dev`mode:

```
npm run dev
```

### Docker

The Makefile is already configured to create an image for you:

```
make image
```

Run the docker image:

```
make up
```

## End Points

Detailed API usage can be found [here](https://jguerra6.github.io/poke-api) but aslo this is a quick overview.

```
/api/v1/pokemon-compare/damage/?pokemon1={{pokemon_1}}&pokemon2={{pokemon_2}}
```

This endpoint will help you to prepare for a battle. It receives 2 pokemon names and will return an object with the damage dealt/received:

- **deal_double_damage:** Boolean value that indicates if pokemon1 can deal double damage to pokemon 2.
- **receive_half_damage:** Boolean value that indicates if pokemon1 can receive half damage from pokemon 2.
- **receive_zero_damage:** Boolean value that indicates if pokemon1 can receive no damage from pokemon 2.

```
/api/v1/pokemon-compare/moves/?pokemons={{pokemon_1}},{{pokemon_2}},...,{{pokemon_n}}
```

This endpoint will help you to see what 2 or more pokemons have in common. It receieves 2 or more pokemon names and will return all the moves they have in common.

Some pokemons have several moves in common, so this endpoint has support to limit the responses.

Also, the following languages are supported:

| Language |  Code   |
| -------- | :-----: |
| Japanese | ja-Hrkt |
| Korean   |   ko    |
| Chinese  | zh-Hant |
| French   |   fr    |
| German   |   de    |
| Spanish  |   es    |
| Italian  |   it    |
| English  |   en    |
| Japanese |   ja    |
| Chinese  | zh-Hans |

## Testing

- To run all the tests invoke the npm command:

```
npm test
```

- To run the unit tests run:

```
npm run unit-test
```

- To run the integration tests run:

```
npm run integration-test
```

## CI/CD

1. Perform all the tests on the API.
1. Run a SonarCloud report,
1. Create a Docker Image.
1. Upload the Docker Image to an IBM Registry (ICR).
1. Deploy the image into a Kubernetes IBM Cluster.

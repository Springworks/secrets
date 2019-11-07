# Secrets

Github action for fetching secrets from AWS Secrets Manager and print them to .txt files for each key in that secret.

The file(s) will be stored in the job working directory in this format:

`SECRET_<key>.txt`

AWS credentials and region are needed as always. 

## Inputs

### `secret-name`

**Required** The Name of secret to get from AWS Secrets Manager.

## Example usage

```yml
- name: Get secrets
  uses: springworks/secrets@master
  with:
    secret-name: 'github-actions-secrets'
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_REGION: 'eu-west-1'    
```

## Example result

Files generated in working directory:
```
<job-working-dir>
  |- SECRET_NPM_TOKEN.txt
  |- SECRET_SOMETHING_VERY_SECRET.txt
  |- SECRET_SOMETHING_EXTREMELY_SECRET.txt
```

#!/bin/bash

mode=$1

if [ -z "$1" ]
then
    mode='dev'
fi

if [ $mode == 'dev' ]
then
    BASE='gs://publisher-staging.newsai.org/'
else
    BASE='gs://publisher.newsai.org/'
fi

npm run build
gsutil rsync -d -r build $BASE
gsutil -m acl set -R -a public-read $BASE
gsutil web set -m index.html -e 404.html $BASE

gsutil setmeta -h "Content-Type:text/html" -h "Cache-Control:public, max-age=3600" -h "Content-Disposition" $(printf "%sindex.html" "$BASE")

gsutil setmeta -h "Content-Type:application/javascript" -h "Cache-Control:public, max-age=3600" -h "Content-Disposition" $(printf "%sserviceworker.js" "$BASE")

gsutil setmeta -h "Content-Type:application/javascript" -h "Cache-Control:public, max-age=3600" -h "Content-Disposition" $(printf "%sjs/bundle.js" "$BASE")

gsutil setmeta -h "Content-Type:text/css" -h "Cache-Control:public, max-age=3600" -h "Content-Disposition" $(printf "%scss/main.css" "$BASE")


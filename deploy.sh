npm run build
gsutil rsync -d -r build gs://publisher.newsai.org/
gsutil -m acl set -R -a public-read gs://publisher.newsai.org/
gsutil web set -m index.html -e 404.html gs://publisher.newsai.org/

gsutil setmeta -h "Content-Type:text/html" -h "Cache-Control:public, max-age=3600" -h "Content-Disposition" gs://publisher.newsai.org/index.html

gsutil setmeta -h "Content-Type:application/javascript" -h "Cache-Control:public, max-age=3600" -h "Content-Disposition" gs://publisher.newsai.org/serviceworker.js

gsutil setmeta -h "Content-Type:application/javascript" -h "Cache-Control:public, max-age=3600" -h "Content-Disposition" gs://publisher.newsai.org/js/bundle.js

gsutil setmeta -h "Content-Type:text/css" -h "Cache-Control:public, max-age=3600" -h "Content-Disposition" gs://publisher.newsai.org/css/main.css


export default `{
  "@context" : "http://schema.org",
  "@type" : "Article",
  "url" : "articleURL",
  "headline": "articleTitle",
  "datePublished" : "articlePubDate",
  "dateModified": "articleModDate",
  "mainEntityOfPage": {
  	"@type":"WebPage",
   	"@id":"articleURL",
    "name" : "articleTitle",
    "image": "articleImgURL"
    },
  "articleSection" : [ "articleSecR" ],
  "description" : "articleDesc",
  "publisher" : {
  	"@type" : "Organization",
    "@id": "publisherURL",
    "name" : "publisherName",
    "logo": {
    "@type":"ImageObject",
    "url":"publihserImgURL"
    }
  },
  "image" : {
  	"@type": "imageObject",
    "url":"articleImgURL"
  },
  "author" : {
    "@type" : "Person",
    "name" : "authorName",
    "url": "authorURL",
    "image": {
    	"@type": "imageObject",
        "url": "authorImgURL"
    }
  }
}`
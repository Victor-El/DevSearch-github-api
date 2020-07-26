const CACHE_NAME = "dev-search-v1";

const URLS_TO_PRECACHE = [
    "/",
    "/styles/style.css",
    "/scripts/main.js",
    "/favicon.ico"
];

self.addEventListener("install", (event) => {
    console.log("Service worker is installing");
    
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
        
        cache.keys().then(keys => {
            keys.forEach(request => {
                cache.delete(request);
            });
        });
    
        return cache.addAll(URLS_TO_PRECACHE).then(function() {
            console.log("Prechached");
        }).then(function() {
            console.log("Trying to precache");
        });
    }));
    console.log("Service worker installed");
});

self.addEventListener("activate", (event) => {
    console.log("activated");
});

self.addEventListener("fetch", event => {
    console.log("Listening to event:", event.request);
    
    event.respondWith(caches.match(event.request).then(response => {
        if (response) {
            return response;
        }
        
        return fetch(event.request).then(res => {
            if (!res || res.status !== 200) {
                return res;
            }
            
            const clonedResponse = res.clone();
            caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, clonedResponse);
            });
            
            return res;
        });
    }));
});

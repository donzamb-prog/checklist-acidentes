/*
=========================================================
Checklist de Acidentes
Copyright (c) 2026 Donizete Zambeli

Licenciado conforme os termos do arquivo LICENSE.

Repositório oficial:
https://donzamb-prog.github.io/checklist-acidentes/

Desenvolvido por Donizete Zambeli
Projeto Checklist de Acidentes
=========================================================*/

const CACHE_NAME = 'pioneiro-pv-v2'; // Mudamos de v1 para v2 para forçar a atualização nos aparelhos!

const ASSETS = [
    './',
    './index.html',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './TIMBRADO.png',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    // Se encontrar o cache antigo (v1), deleta ele para liberar espaço
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

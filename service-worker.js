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

const CACHE_NAME = 'checklist-acidentes-v4'; // Atualizado para forçar atualização no navegador/aparelho!

const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
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

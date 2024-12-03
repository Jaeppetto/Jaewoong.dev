/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ArticleWritingImport } from './routes/article_.writing'
import { Route as ArticleCategoryImport } from './routes/article_.$category'
import { Route as ArchiveProjectTitleImport } from './routes/archive_.$projectTitle'
import { Route as ArticleCategoryPostTitleImport } from './routes/article_.$category_.$postTitle'

// Create Virtual Routes

const ArticleLazyImport = createFileRoute('/article')()
const ArchiveLazyImport = createFileRoute('/archive')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const ArticleLazyRoute = ArticleLazyImport.update({
  id: '/article',
  path: '/article',
  getParentRoute: () => rootRoute
} as any).lazy(() => import('./routes/article.lazy').then(d => d.Route))

const ArchiveLazyRoute = ArchiveLazyImport.update({
  id: '/archive',
  path: '/archive',
  getParentRoute: () => rootRoute
} as any).lazy(() => import('./routes/archive.lazy').then(d => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute
} as any).lazy(() => import('./routes/about.lazy').then(d => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute
} as any).lazy(() => import('./routes/index.lazy').then(d => d.Route))

const ArticleWritingRoute = ArticleWritingImport.update({
  id: '/article_/writing',
  path: '/article/writing',
  getParentRoute: () => rootRoute
} as any)

const ArticleCategoryRoute = ArticleCategoryImport.update({
  id: '/article_/$category',
  path: '/article/$category',
  getParentRoute: () => rootRoute
} as any)

const ArchiveProjectTitleRoute = ArchiveProjectTitleImport.update({
  id: '/archive_/$projectTitle',
  path: '/archive/$projectTitle',
  getParentRoute: () => rootRoute
} as any)

const ArticleCategoryPostTitleRoute = ArticleCategoryPostTitleImport.update({
  id: '/article_/$category_/$postTitle',
  path: '/article/$category/$postTitle',
  getParentRoute: () => rootRoute
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/archive': {
      id: '/archive'
      path: '/archive'
      fullPath: '/archive'
      preLoaderRoute: typeof ArchiveLazyImport
      parentRoute: typeof rootRoute
    }
    '/article': {
      id: '/article'
      path: '/article'
      fullPath: '/article'
      preLoaderRoute: typeof ArticleLazyImport
      parentRoute: typeof rootRoute
    }
    '/archive_/$projectTitle': {
      id: '/archive_/$projectTitle'
      path: '/archive/$projectTitle'
      fullPath: '/archive/$projectTitle'
      preLoaderRoute: typeof ArchiveProjectTitleImport
      parentRoute: typeof rootRoute
    }
    '/article_/$category': {
      id: '/article_/$category'
      path: '/article/$category'
      fullPath: '/article/$category'
      preLoaderRoute: typeof ArticleCategoryImport
      parentRoute: typeof rootRoute
    }
    '/article_/writing': {
      id: '/article_/writing'
      path: '/article/writing'
      fullPath: '/article/writing'
      preLoaderRoute: typeof ArticleWritingImport
      parentRoute: typeof rootRoute
    }
    '/article_/$category_/$postTitle': {
      id: '/article_/$category_/$postTitle'
      path: '/article/$category/$postTitle'
      fullPath: '/article/$category/$postTitle'
      preLoaderRoute: typeof ArticleCategoryPostTitleImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/archive': typeof ArchiveLazyRoute
  '/article': typeof ArticleLazyRoute
  '/archive/$projectTitle': typeof ArchiveProjectTitleRoute
  '/article/$category': typeof ArticleCategoryRoute
  '/article/writing': typeof ArticleWritingRoute
  '/article/$category/$postTitle': typeof ArticleCategoryPostTitleRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/archive': typeof ArchiveLazyRoute
  '/article': typeof ArticleLazyRoute
  '/archive/$projectTitle': typeof ArchiveProjectTitleRoute
  '/article/$category': typeof ArticleCategoryRoute
  '/article/writing': typeof ArticleWritingRoute
  '/article/$category/$postTitle': typeof ArticleCategoryPostTitleRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/archive': typeof ArchiveLazyRoute
  '/article': typeof ArticleLazyRoute
  '/archive_/$projectTitle': typeof ArchiveProjectTitleRoute
  '/article_/$category': typeof ArticleCategoryRoute
  '/article_/writing': typeof ArticleWritingRoute
  '/article_/$category_/$postTitle': typeof ArticleCategoryPostTitleRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/archive'
    | '/article'
    | '/archive/$projectTitle'
    | '/article/$category'
    | '/article/writing'
    | '/article/$category/$postTitle'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/archive'
    | '/article'
    | '/archive/$projectTitle'
    | '/article/$category'
    | '/article/writing'
    | '/article/$category/$postTitle'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/archive'
    | '/article'
    | '/archive_/$projectTitle'
    | '/article_/$category'
    | '/article_/writing'
    | '/article_/$category_/$postTitle'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AboutLazyRoute: typeof AboutLazyRoute
  ArchiveLazyRoute: typeof ArchiveLazyRoute
  ArticleLazyRoute: typeof ArticleLazyRoute
  ArchiveProjectTitleRoute: typeof ArchiveProjectTitleRoute
  ArticleCategoryRoute: typeof ArticleCategoryRoute
  ArticleWritingRoute: typeof ArticleWritingRoute
  ArticleCategoryPostTitleRoute: typeof ArticleCategoryPostTitleRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AboutLazyRoute: AboutLazyRoute,
  ArchiveLazyRoute: ArchiveLazyRoute,
  ArticleLazyRoute: ArticleLazyRoute,
  ArchiveProjectTitleRoute: ArchiveProjectTitleRoute,
  ArticleCategoryRoute: ArticleCategoryRoute,
  ArticleWritingRoute: ArticleWritingRoute,
  ArticleCategoryPostTitleRoute: ArticleCategoryPostTitleRoute
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/archive",
        "/article",
        "/archive_/$projectTitle",
        "/article_/$category",
        "/article_/writing",
        "/article_/$category_/$postTitle"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/archive": {
      "filePath": "archive.lazy.tsx"
    },
    "/article": {
      "filePath": "article.lazy.tsx"
    },
    "/archive_/$projectTitle": {
      "filePath": "archive_.$projectTitle.tsx"
    },
    "/article_/$category": {
      "filePath": "article_.$category.tsx"
    },
    "/article_/writing": {
      "filePath": "article_.writing.tsx"
    },
    "/article_/$category_/$postTitle": {
      "filePath": "article_.$category_.$postTitle.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

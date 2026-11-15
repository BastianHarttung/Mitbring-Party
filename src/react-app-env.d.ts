/// <reference types="react-scripts" />

// react-scripts only declares *.module.(s)css. Newer TypeScript versions check
// side-effect imports (noUncheckedSideEffectImports), so plain style imports
// like `import "./App.scss"` need a declaration as well.
declare module "*.css";
declare module "*.scss";
declare module "*.sass";

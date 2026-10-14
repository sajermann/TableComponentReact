export interface RouteFileInfo {
  filePath: string;
  testPath: string;
  componentName: string;
  folder: string;
}

// Converte kebab-case para PascalCase (ex: column-order -> ColumnOrder)
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

export function resolveRouteToFile(pathname: string): RouteFileInfo | null {
  // Normaliza tirando barra final
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  // Páginas iniciais dos padrões
  if (cleanPath === '/traditional-pattern') {
    return {
      folder: 'src/pages/TraditionalPattern',
      filePath: 'src/pages/TraditionalPattern/index.tsx',
      testPath: 'src/pages/TraditionalPattern/index.test.tsx',
      componentName: 'TraditionalPattern',
    };
  }

  if (cleanPath === '/composition-pattern') {
    return {
      folder: 'src/pages/TableMega',
      filePath: 'src/pages/TableMega/index.tsx',
      testPath: 'src/pages/TableMega/index.test.tsx',
      componentName: 'TableMega',
    };
  }

  // Detecta se é traditional-pattern ou composition-pattern
  let baseFolder = '';
  let slug = '';

  if (cleanPath.startsWith('/traditional-pattern/')) {
    baseFolder = 'src/pages/TraditionalPattern';
    slug = cleanPath.replace('/traditional-pattern/', '');
  } else if (cleanPath.startsWith('/composition-pattern/')) {
    baseFolder = 'src/pages/TableMega';
    slug = cleanPath.replace('/composition-pattern/', '');
  } else {
    return null;
  }

  // Verifica se há override ou converte direto kebab-case -> PascalCase
  const folderName = toPascalCase(slug);
  const folder = `${baseFolder}/${folderName}`;

  return {
    folder,
    filePath: `${folder}/index.tsx`,
    testPath: `${folder}/index.test.tsx`,
    componentName: folderName,
  };
}

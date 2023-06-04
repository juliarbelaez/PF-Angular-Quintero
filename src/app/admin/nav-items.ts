interface NavItem {
  path: string;
  title: string;
  icon?: string;
}

const links: NavItem[] = [
  {
    path: 'estudiantes',
    title: 'Estudiantes',
    icon: 'person',
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'apps',
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    icon: 'post_add',
  },
];
export default links;

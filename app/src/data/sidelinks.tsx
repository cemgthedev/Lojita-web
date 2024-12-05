import { URLS } from "@/constants/urls";
import {
  ArchiveRestore,
  Building,
  Building2Icon,
  CalendarPlus2Icon,
  ChartAreaIcon,
  ChartBarBig,
  CopyPlusIcon,
  FileKey2,
  GroupIcon,
  LayoutDashboardIcon,
  ShieldPlusIcon,
  UserPlus2Icon,
} from "lucide-react";

export interface NavLink {
  title: string;
  label?: string;
  permission?: string; //PermissionNameType;
  href: string;
  icon: JSX.Element;
  sub?: NavLink[];
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: URLS.dashboard,
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    title: "Analise de Desempenho",
    label: "",
    href: URLS.overall_performances,
    icon: <ChartAreaIcon size={18} />,
  },
  {
    title: "Desempenho por Turma",
    label: "",
    href: URLS.evaluations,
    icon: <ChartBarBig size={18} />,
  },
  {
    title: "Avaliações PDFs",
    label: "",
    href: URLS.proofs,
    icon: <ArchiveRestore size={18} />,
  },
  {
    title: "Cadastros",
    label: "",
    href: "",
    icon: <CopyPlusIcon size={18} />,
    sub: [
      {
        title: "Permissões",
        label: "",
        href: URLS.permission_groups,
        icon: <ShieldPlusIcon size={18} />,
      },
      {
        title: "Empresas",
        label: "",
        href: URLS.enterprises,
        icon: <Building2Icon size={18} />,
      },
      {
        title: "Instituições",
        label: "",
        href: URLS.institutions,
        icon: <Building size={18} />,
      },
      {
        title: "Representantes",
        label: "",
        href: URLS.representatives,
        icon: <UserPlus2Icon size={18} />,
      },
      {
        title: "Tipos de Avaliação",
        label: "",
        href: URLS.evaluation_types,
        icon: <FileKey2 size={18} />,
      },
      {
        title: "Bimestres",
        label: "",
        href: URLS.bimesters,
        icon: <CalendarPlus2Icon size={18} />,
      },
      {
        title: "Turmas",
        label: "",
        href: URLS.school_classes,
        icon: <GroupIcon size={18} />,
      },
    ],
  },
];

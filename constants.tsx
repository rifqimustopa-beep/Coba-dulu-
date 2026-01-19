
import { Mustahik, MustahikStatus, AsnafCategory } from './types';

export const MOCK_MUSTAHIK: Mustahik[] = [
  {
    id: 'MS-001',
    name: 'Ahmad Subarjo',
    age: 54,
    location: 'Kota Jambi',
    income: 800000,
    dependents: 4,
    category: AsnafCategory.MISKIN,
    status: MustahikStatus.APPROVED,
    submissionDate: '2023-11-15'
  },
  {
    id: 'MS-002',
    name: 'Siti Aminah',
    age: 62,
    location: 'Muaro Jambi',
    income: 300000,
    dependents: 1,
    category: AsnafCategory.FAKIR,
    status: MustahikStatus.SURVEY,
    submissionDate: '2023-11-20'
  },
  {
    id: 'MS-003',
    name: 'Budi Santoso',
    age: 41,
    location: 'Batanghari',
    income: 1200000,
    dependents: 5,
    category: AsnafCategory.GHARIM,
    status: MustahikStatus.PENDING,
    submissionDate: '2023-11-22'
  },
  {
    id: 'MS-004',
    name: 'Laila Sari',
    age: 35,
    location: 'Sarolangun',
    income: 0,
    dependents: 3,
    category: AsnafCategory.FAKIR,
    status: MustahikStatus.APPROVED,
    submissionDate: '2023-11-10'
  },
  {
    id: 'MS-005',
    name: 'Dedi Kurniawan',
    age: 28,
    location: 'Tanjung Jabung Barat',
    income: 2000000,
    dependents: 2,
    category: AsnafCategory.FISABILILLAH,
    status: MustahikStatus.REJECTED,
    submissionDate: '2023-11-18'
  }
];

export const CHART_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

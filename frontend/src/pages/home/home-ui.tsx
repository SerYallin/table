import React from 'react';

import { NumTable } from '@widgets/num-table';
import { SearchForm } from '@widgets/search-form';
import styles from './home.module.scss';

export const HomeUi: React.FC = () => (
  <section className={styles.content}>
    <header>
      <h1 className={styles.title}>Welcome to the number&aposs example</h1>
    </header>
    <SearchForm />
    <NumTable />
  </section>
);

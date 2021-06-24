import React from 'react';

import { UserProvider } from './users';
import { AssetsProvider } from './assets';
import { CompanyProvider } from './companies';
import { UnitProvider } from './units';

const AppProvider: React.FC = ({ children }) => {
  return (
    <CompanyProvider>
      <UnitProvider>
        <UserProvider>
          <AssetsProvider>
            {children}
          </AssetsProvider>
        </UserProvider>
      </UnitProvider>
    </CompanyProvider>
  );
};

export default AppProvider;
'use client'

import { useState } from 'react'
import UserManagement from './UserManagement'
import RoleManagement from './RoleManagement'
import PermissionManagement from './PermissionManagement'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('users')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const getFilterOptions = () => {
    switch (activeTab) {
      case 'users':
        return ['All', 'Admin', 'Editor', 'Viewer']
      case 'roles':
        return ['All', 'With Delete', 'Without Delete']
      case 'permissions':
        return ['All', 'Read', 'Write', 'Delete']
      default:
        return ['All']
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement searchQuery={searchQuery} activeFilter={activeFilter} />
      case 'roles':
        return <RoleManagement searchQuery={searchQuery} activeFilter={activeFilter} />
      case 'permissions':
        return <PermissionManagement searchQuery={searchQuery} activeFilter={activeFilter} />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
          onSearch={setSearchQuery}
          onFilter={setActiveFilter}
          filterOptions={getFilterOptions()}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}


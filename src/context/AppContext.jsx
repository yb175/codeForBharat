import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [reports, setReports] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load mock data
    setEvents(mockData.events);
    setLostItems(mockData.lostItems);
    setStudyMaterials(mockData.studyMaterials);
    setStudyGroups(mockData.studyGroups);
    setMediaItems(mockData.mediaItems);
    setReports(mockData.reports);
    setNotifications(mockData.notifications);
  }, []);

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      registeredUsers: []
    };
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  };

  const registerForEvent = (eventId, userId) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, registeredUsers: [...event.registeredUsers, userId] }
        : event
    ));
  };

  const addLostItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'lost'
    };
    setLostItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const addStudyMaterial = (material) => {
    const newMaterial = {
      ...material,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      downloads: 0
    };
    setStudyMaterials(prev => [newMaterial, ...prev]);
    return newMaterial;
  };

  const addStudyGroup = (group) => {
    const newGroup = {
      ...group,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      members: []
    };
    setStudyGroups(prev => [newGroup, ...prev]);
    return newGroup;
  };

  const joinStudyGroup = (groupId, userId) => {
    setStudyGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, members: [...group.members, userId] }
        : group
    ));
  };

  const addMediaItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    setMediaItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const addReport = (report) => {
    const newReport = {
      ...report,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setReports(prev => [newReport, ...prev]);
    return newReport;
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  };

  const value = {
    events,
    lostItems,
    studyMaterials,
    studyGroups,
    mediaItems,
    reports,
    notifications,
    addEvent,
    registerForEvent,
    addLostItem,
    addStudyMaterial,
    addStudyGroup,
    joinStudyGroup,
    addMediaItem,
    addReport,
    addNotification
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
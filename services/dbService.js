// services/dbService.js
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  getDoc,
  setDoc, 
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';

export const completeOnboarding = async (userId, data) => {
  await setDoc(doc(db, 'users', userId), {
    onboardingComplete: true, // ← This triggers the auto-redirect
    ...data,
    updatedAt: new Date()
  }, { merge: true });
};

export const checkOnboardingStatus = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId); // Create document reference
    const docSnap = await getDoc(userRef);    // Now getDoc is available
    
    if (!docSnap.exists()) {
      console.log('No user document found - treating as new user');
      return false; // First-time user
    }
    
    return docSnap.data().onboardingComplete || false;
  } catch (error) {
    console.error('Error checking onboarding:', error);
    return false; // Default to onboarding if check fails
  }
};

export const addInboxItem = async (userId, content) => {
  return await addDoc(collection(db, 'users', userId, 'inbox'), {
    content,
    createdAt: serverTimestamp(),
    status: 'unprocessed'
  });
};

export const processInboxItem = async (userId, itemId) => {
  return await updateDoc(doc(db, 'users', userId, 'inbox', itemId), {
    status: 'processed'
  });
};

export const addTask = async (userId, taskData) => {
  return await addDoc(collection(db, 'users', userId, 'tasks'), {
    ...taskData,
    status: 'active',
    createdAt: serverTimestamp()
  });
};

export const completeTask = async (userId, taskId) => {
  return await updateDoc(doc(db, 'users', userId, 'tasks', taskId), {
    status: 'completed',
    completedAt: serverTimestamp()
  });
};

export const rescheduleTask = async (userId, taskId, newDate) => {
  return await updateDoc(doc(db, 'users', userId, 'tasks', taskId), {
    dueDate: newDate
  });
};

export const getTodaysTasks = async (userId, date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  const q = query(
    collection(db, 'users', userId, 'tasks'),
    where('dueDate', '>=', startOfDay),
    where('dueDate', '<=', endOfDay),
    where('status', '==', 'active')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
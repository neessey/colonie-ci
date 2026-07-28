/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export function initAdmin() {
  try {
    if (getApps().length === 0) {
      // ✅ Vérifier que les variables existent
      const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
      let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

      if (!projectId || !clientEmail || !privateKey) {
        throw new Error('❌ Variables Firebase Admin manquantes dans .env.local');
      }

      // ✅ Nettoyer la clé privée
      privateKey = privateKey.replace(/\\n/g, '\n');
      
      // ✅ Si la clé a des guillemets, les enlever
      if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.slice(1, -1);
      }

      console.log('✅ Initialisation Firebase Admin...');
      
      initializeApp({
        credential: cert({
          projectId: projectId,
          clientEmail: clientEmail,
          privateKey: privateKey,
        }),
      });
      
      console.log('✅ Firebase Admin initialisé avec succès !');
    }
    
    return {
      auth: getAuth(),
    };
  } catch (error) {
    console.error('❌ Erreur initAdmin:', error);
    throw error;
  }
}

// ✅ Fonction pour définir un utilisateur comme admin
export async function setAdminRole(email: string): Promise<void> {
  try {
    console.log(`🔧 Définition du rôle admin pour ${email}...`);
    const { auth } = initAdmin();
    
    // ✅ Récupérer l'utilisateur par email
    const user = await auth.getUserByEmail(email);
    console.log(`✅ Utilisateur trouvé: ${user.uid}`);
    
    // ✅ Définir les claims
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`✅ ${email} est maintenant administrateur !`);
    
  } catch (error: any) {
    console.error('❌ Erreur setAdminRole:', error);
    
    if (error.code === 'auth/user-not-found') {
      throw new Error(`❌ L'utilisateur avec l'email "${email}" n'existe pas dans Firebase Authentication.`);
    }
    
    throw new Error(`❌ Erreur lors de la définition du rôle admin: ${error.message}`);
  }
}

// ✅ Fonction pour vérifier si un utilisateur est admin
export async function isAdmin(uid: string): Promise<boolean> {
  try {
    const { auth } = initAdmin();
    const user = await auth.getUser(uid);
    const claims = user.customClaims || {};
    return claims.admin === true;
  } catch (error) {
    console.error('❌ Erreur isAdmin:', error);
    return false;
  }
}
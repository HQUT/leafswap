import React, { useState , useEffect} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { MDBInput } from 'mdb-react-ui-kit';
import ProfilePicture from './picture';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { app } from '../../firebaseConfig';
import { useProfile } from './ProfileContext';

export default function PersonalProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('Web Designer');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const { profileData, updateProfileData } = useProfile(); 
  const auth = getAuth();

  useEffect(() => {
    console.log('Aktuell profildata från Context:', profileData);
    setName(profileData.name);
    setEmail(profileData.email);
    setPhone(profileData.phone);
    setOccupation(profileData.occupation);
    setProfilePic(profileData.avatar);
  }, [profileData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        fetchUserProfile(firebaseUser.uid);
      } else {
        setUser(null);
      }
    });

    return unsubscribe; 
  }, [auth]);

  function fetchUserProfile(uid) {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${uid}`);
    
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setProfilePic(data.avatar);
        setOccupation(data.occupation);
      }
    });
  }

  function saveUserProfile(uid, profileData) {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${uid}`);
    
    update(userRef, profileData)
      .then(() => {
        console.log('Profil uppdaterad i Firebase');
      })
      .catch((error) => {
        console.error('Ett fel inträffade vid uppdatering av profil i Firebase', error);
      });
  }

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const newProfileData = {
      name,
      email,
      phone,
      profilePic,
      occupation,
    };

    if (user) {
      saveUserProfile(user.uid, newProfileData);
      
    }  
    updateProfileData(newProfileData);
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);
  


  return (
    <section className="vh-100">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white profile-col"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    
                  {isEditing ? 
                    <ProfilePicture profilePic={profilePic} setProfilePic={setProfilePic} />
                    : <MDBCardImage src={profilePic} alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  }
  
                  {!isEditing && (
                    <button className="edit-button" onClick={handleEdit} style={{ padding: '5px 10px', margin: '5px' }}>
                      Edit Profile
                    </button>
                  )}
                  
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    {isEditing ? (
                      <div>
                        <div className="mb-3">
                          <label>Name</label>
                          <MDBInput id='typeText' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label>Job</label>
                          <MDBInput id='typeText' type='text' value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label>Email</label>
                          <MDBInput id='typeEmail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label>Phone number</label>
                          <MDBInput id='typePhone' type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <button onClick={handleSave} style={{ margin: '10px', padding: '5px 20px' }}>Save</button>
                        <button onClick={handleCancel} style={{ margin: '10px', padding: '5px 20px' }}>Cancel</button>
                      </div>
                    ) : (
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">{email}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">{phone}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    )}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
  
 }  
import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { MDBInput } from 'mdb-react-ui-kit';
import ProfilePicture from './picture';



export default function PersonalProfile() {

  console.log("Rendering PersonalProfile");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Marie Horwitz');
  const [occupation, setOccupation] = useState('Web Designer');
  const [email, setEmail] = useState('info@example.com');
  const [phone, setPhone] = useState('+46 ** *** ** **');
  const [profilePic, setProfilePic] = useState('https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp');

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
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
                      Redigera Profil
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
                        <button onClick={handleSave} style={{ margin: '10px', padding: '5px 20px' }}>Spara</button>
                        <button onClick={handleCancel} style={{ margin: '10px', padding: '5px 20px' }}>Avbryt</button>
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
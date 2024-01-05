  import React, { useState} from 'react';
  import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBInput } from 'mdb-react-ui-kit';
  import ProfilePicture from './picture';
  import { useModelProperty } from '../useModelProperty';
  
  export default function PersonalProfile({ model }) {
    const [isEditing, setIsEditing] = useState(false);
    const profileData = useModelProperty(model, 'profileData');
  
    const handleEditButtonClick = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    const handleChange = (e, field) => {
      model.setProfileData({ ...profileData, [field]: e.target.value });
    };

    const handleSave = () => {
      model.saveUserProfile(profileData);
      setIsEditing(false);
    };
  
  
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
                      <ProfilePicture avatar={profileData.avatar} setAvatar={(url) => model.setProfileData({...profileData, avatar: url})} />
                      : <MDBCardImage src={profileData.avatar} alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                    }
    
                    {!isEditing && (
                      <button className="edit-button" onClick={handleEditButtonClick} style={{ padding: '5px 10px', margin: '5px' }}>
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
                            <MDBInput id='typeText' type='text' value={profileData.name} onChange={(e) => handleChange(e, 'name')} />
                          </div>
                          <div className="mb-3">
                            <label>Job</label>
                            <MDBInput id='typeText' type='text' value={profileData.occupation} onChange={(e) => handleChange(e, 'occupation')} />
                          </div>
                          <div className="mb-3">
                            <label>Email</label>
                            <MDBInput id='typeEmail' type='email' value={profileData.email} onChange={(e) => handleChange(e, 'email')} />
                          </div>
                          <div className="mb-3">
                            <label>Phone number</label>
                            <MDBInput id='typePhone' type='tel' value={profileData.phone} onChange={(e) => handleChange(e, 'phone')} />
                          </div>
                          <button onClick={handleSave} style={{ margin: '10px', padding: '5px 20px' }}>Save</button>
                          <button onClick={handleCancel} style={{ margin: '10px', padding: '5px 20px' }}>Cancel</button>
                        </div>
                      ) : (
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">{profileData.email}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">{profileData.phone}</MDBCardText>
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
  



export type user = {
  id: string;
  first_name: string;
  last_name?: string | null;
  email: string;
  password: string;
  role: string;
};

export type resetToken = {
  id?: string;
  user_id: string;
  token: string;
  expires_at: Date;
  created_at: Date;
};

export type users = {
  id?: string;
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
};
export type gallery = {
  id?: string;
  image: string;
  

};
export type galleryn = {
  id?: string;
  image: string;

};




export type newUser = {
  id?: string;
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
};

export type modifiedUser = {
  id?: string;
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  role: string;
};

export type DBUser = {
  id: string;
  first_name: string;
  last_name?: string | null;
  email: string;
  password: string;
  role: string;
};

export type userInfo = {
  email: string;
  password: string;
};

export type newSetting = {
  id?: string;
  key_name_en?: string;
  key_name_ar?: string;
  value_en?: string;
  value_ar?: string;
  created_at?: Date;
};


export type tokenPayload = {
  user_id: string;
  role: string;
  name: string;
};

export type userDetails = {
  id?: string;
  email: string;
  role: string;
  first_name: string;
};

export type NewEmail = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  subject: string;
  description: string;
  sent_at?: Date;
};

export type NewExperience = {
  id?: string;
  positions_en: string;
  positions_ar: string;
  description_en: string;
  description_ar: string;
  start_date: Date;
  end_date: Date | null;
  location_en: string;
  location_ar: string;
  current_job: boolean;
};
export type ExperienceTranslated = {
  id?: string;
  positions: string;
  description: string;
  start_date: Date;
  end_date: Date | null;
  location: string;
  current_job: boolean;
};

export type EducationTranslated = {
  id?: string;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date | null;
  location: string;
};

export type NewSkill = {
  id?: string;
  name_en: string;
  name_ar: string;

  description_en: string;
  description_ar: string;
};
export type SkillTranslated = {
  id?: string;
  name: string;
  description: string;
};

export type NewEducation = {
  id?: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  start_date: Date;
  end_date: Date | null;
  location_en: string;
  location_ar: string;
};

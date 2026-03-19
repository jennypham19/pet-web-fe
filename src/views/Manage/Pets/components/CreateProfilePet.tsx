import { ChangeEvent, useRef, useState } from "react";



import { PhotoCamera } from "@mui/icons-material";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Deworming from "./InformationDetails/Deworming";
import PetHealthInformation from "./InformationDetails/PetHealthInformation";
import PetInformation from "./InformationDetails/PetInformation";
import RegularVetCheckup from "./InformationDetails/RegularVetCheckup";
import SpecialNutritionalPlan from "./InformationDetails/SpecialNutritionalPlan";
import Vaccination from "./InformationDetails/Vaccination";
import Backdrop from "@/components/Backdrop";
import CommonImage from "@/components/Image/index";



import image_pet from "@/assets/images/users/image-pet.jpg";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { createPet } from "@/services/pet-service";
import { uploadImage } from "@/services/upload-service";
import { FormErrorsDeworming, FormErrorsHealthPet, FormErrorsInfoPet, FormErrorsRegularVetCheckup, FormErrorsSpecialNutritionalPlan, FormErrorsVaccination } from "@/types/errors";
import { FormDataDeworming, FormDataInfoHealthPet, FormDataInfoPet, FormDataRegularVetCheckup, FormDataSpecialNutritionalPlan, FormDataVaccination, PayloadPet } from "@/types/pet";
import { resizeImage } from "@/utils/common";
import NavigateBack from "@/views/components/NavigateBack";


interface CreateProfilePetProps{
    onClose: () => void;
}

const CreateProfilePet = (props: CreateProfilePetProps) => {
    const { onClose } = props;
    const notify = useNotification();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [urlImage, setUrlImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formDataInfoPet, setFormDataInfoPet] = useState<FormDataInfoPet>({ avartar: null, name: '', sex: '', dob: null, species: '', type: '', breedingStatus: '' });
    const [formDataInfoHealthPet, setFormDataInfoHealthPet] = useState<FormDataInfoHealthPet>({ clinicName: '', address: '', phone: '', attendingVet: '' });
    const [formDataVaccination, setFormDataVaccination] = useState<FormDataVaccination>({ medicationName: '', firstDoseDate: null, boosterDate: null, adverseReaction: '' });
    const [formDataDeworming, setFormDataDeworming] = useState<FormDataDeworming>({ medicationName: '', dosage: '', dewormingDate: null, nextDewormingDate: null });
    const [formDataRegularVetCheckup, setFormDataRegularVetCheckup] = useState<FormDataRegularVetCheckup>({ examinationDate: null, recheckDate: null, healthCondition: '', conclusion: '' });
    const [formDataSpecialNutritionalPlan, setFormDataSpecialNutritionalPlan] = useState<FormDataSpecialNutritionalPlan>({ food: '', amount: '', frequency: '', nutritionalSupplements: '' });

    const [errorInfoPet, setErrorInfoPet] = useState<FormErrorsInfoPet>({});
    const [errorInfoHealthPet, setErrorInfoHealthPet] = useState<FormErrorsHealthPet>({});
    const [errorVaccination, setErrorVaccination] = useState<FormErrorsVaccination>({});
    const [errorDeworming, setErrorDeworming] = useState<FormErrorsDeworming>({});
    const [errorRegularVetCheckup, setErrorRegularVetCheckup] = useState<FormErrorsRegularVetCheckup>({});
    const [errorSpecialNutritionalPlan, setErrorSpecialNutritionalPlan] = useState<FormErrorsSpecialNutritionalPlan>({});
    
    const reset = () => {
        setFormDataInfoPet({ avartar: null, name: '', sex: '', dob: null, species: '', type: '', breedingStatus: '' });
        setFormDataInfoHealthPet({ clinicName: '', address: '', phone: '', attendingVet: '' });
        setFormDataVaccination({ medicationName: '', firstDoseDate: null, boosterDate: null, adverseReaction: '' });
        setFormDataDeworming({ medicationName: '', dosage: '', dewormingDate: null, nextDewormingDate: null });
        setFormDataRegularVetCheckup({ examinationDate: null, recheckDate: null, healthCondition: '', conclusion: '' });
        setFormDataSpecialNutritionalPlan({ food: '', amount: '', frequency: '', nutritionalSupplements: '' });
        setErrorInfoPet({});
        setErrorInfoHealthPet({});
        setErrorVaccination({});
        setErrorDeworming({});
        setErrorRegularVetCheckup({});
        setErrorSpecialNutritionalPlan({});
    }

    const handleClose = () => {
        onClose();
        reset()

    }

    // upload image
    const handleChangeAvatar = async(event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if(file && file.type.startsWith('image/')){
        const { blob, previewUrl } = await resizeImage(file, 800);
        const newFile = new File([blob], file.name, { type: "image/*"});
        setFormDataInfoPet(prev => ({ ...prev, avartar: newFile }));
        setUrlImage(previewUrl);
        setErrorInfoPet(prev => ({ ...prev, avartar: undefined }))
      }else{
        setUrlImage(null);
        event.target.value = "";
      }

      // reset lại input để onChange được gọi nếu chọn lại cùng 1 ảnh
      if(fileInputRef.current){
        fileInputRef.current.value = "";
      }
    }

    // info pet
    const handleInputInfoPetChange = (name: string, value: any) => {
      setFormDataInfoPet(prev => ({ ...prev, [name]: value }));
      if(errorInfoPet[name as keyof typeof errorInfoPet]){
        setErrorInfoPet(prev => ({ ...prev, [name]: undefined }))
      }
    }

    // info health pet
    const handleInputInfoHealthPetChange = (name: string, value: any) => {
      setFormDataInfoHealthPet((prev) => ({ ...prev, [name]: value }));
      if (errorInfoHealthPet[name as keyof typeof errorInfoHealthPet]) {
        setErrorInfoHealthPet((prev) => ({ ...prev, [name]: undefined }));
      }
    };

    // vaccination
    const handleInputVaccinationChange = (name: string, value: any) => {
      setFormDataVaccination((prev) => ({ ...prev, [name]: value }));
      if (errorVaccination[name as keyof typeof errorVaccination]) {
        setErrorVaccination((prev) => ({ ...prev, [name]: undefined }));
      }
    };

    // deworming
    const handleInputDewormingChange = (name: string, value: any) => {
      setFormDataDeworming((prev) => ({ ...prev, [name]: value }));
      if (errorDeworming[name as keyof typeof errorDeworming]) {
        setErrorDeworming((prev) => ({ ...prev, [name]: undefined }));
      }
    };

    // regular vet checkup
    const handleInputRegularVetCheckupChange = (name: string, value: any) => {
      setFormDataRegularVetCheckup((prev) => ({ ...prev, [name]: value }));
      if (errorRegularVetCheckup[name as keyof typeof errorRegularVetCheckup]) {
        setErrorRegularVetCheckup((prev) => ({ ...prev, [name]: undefined }));
      }
    };

    // special nutritional plan
    const handleInputSpecialNutritionalPlanChange = (name: string, value: any) => {
      setFormDataSpecialNutritionalPlan((prev) => ({ ...prev, [name]: value }));
      if (errorSpecialNutritionalPlan[name as keyof typeof errorSpecialNutritionalPlan]) {
        setErrorSpecialNutritionalPlan((prev) => ({ ...prev, [name]: undefined }));
      }
    };

    const validate = (): boolean => {
      const newErrorInfoPet: FormErrorsInfoPet = {};
      if (!formDataInfoPet.avartar) newErrorInfoPet.avartar = 'Vui lòng chọn ảnh thú cưng';
      if (!formDataInfoPet.name) newErrorInfoPet.name = 'Vui lòng nhập tên thú cưng';
      if (!formDataInfoPet.sex) newErrorInfoPet.sex = 'Vui lòng chọn giới tính thú cưng';
      if (!formDataInfoPet.type) newErrorInfoPet.type = 'Vui lòng chọn loại thú cưng';
      if (!formDataInfoPet.species) newErrorInfoPet.species = 'Vui lòng nhập loài thú cưng';
      if (!formDataInfoPet.breedingStatus) newErrorInfoPet.breedingStatus = 'Vui lòng nhập tình trạng sinh sản của thú cưng';

      setErrorInfoPet(newErrorInfoPet);
      return Object.keys(newErrorInfoPet).length === 0;
    }

    const handleSave = async() => {
      if(!validate()){
        return;
      }
      setIsSubmitting(true);
      try {
        let uploadResponse: any;
        uploadResponse = await uploadImage(formDataInfoPet.avartar!, 'pets');
        if (!uploadResponse.success || !uploadResponse.data?.file) {
          throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
        }
        const payload: PayloadPet = {
          pet: {
            name: formDataInfoPet.name,
            sex: formDataInfoPet.sex,
            dob: formDataInfoPet.dob ? formDataInfoPet.dob : null,
            type: formDataInfoPet.type,
            species: formDataInfoPet.species,
            breedingStatus: formDataInfoPet.breedingStatus,
            urlAvatar: uploadResponse.data.file.imageUrl,
            nameAvatar: uploadResponse.data.file.originalname,
          },
        };

        const res = await createPet(payload);
        notify({
          message: res.message,
          severity: 'success'
        })
        handleClose()
      } catch (error: any) {
        notify({
          message: error.message,
          severity: 'error'
        })
      } finally {
        setIsSubmitting(false)
      }
    }
    return (
      <Box>
        <NavigateBack sx={{ p: 1, bgcolor: '#fff' }} title='Tạo hồ sơ' onBack={handleClose} />
        <Grid container spacing={2} sx={{ m: 1 }}>
          <Grid size={{ xs: 12, md: 8.5 }}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant='h6' fontWeight={600}>
                Tạo hồ sơ thú cưng
              </Typography>
              <Grid container spacing={1}>
                {/* --------- Ảnh thú cưng ----------- */}
                <Grid
                  size={{ xs: 12 }}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2.5 }}
                >
                  <Box sx={{ position: 'relative', width: 150, height: 150 }}>
                    <Avatar
                      src={urlImage ?? undefined}
                      sx={{
                        width: '100%',
                        height: '100%',
                        mb: 2,
                        bgcolor: 'grey.500',
                        borderRadius: '50%',
                      }}
                    />
                    <Button
                      variant='contained'
                      sx={{
                        bgcolor: 'grey.300',
                        borderRadius: '50%',
                        minWidth: '30px',
                        width: '30px',
                        height: '30px',
                        position: 'absolute',
                        bottom: 0,
                        right: 5,
                      }}
                      component='label'
                      startIcon={
                        <PhotoCamera
                          sx={{ width: '25px', height: '25px', ml: 1.2, color: '#1C1A1B' }}
                        />
                      }
                    >
                      <input
                        ref={fileInputRef}
                        type='file'
                        hidden
                        accept='iamge/*'
                        onChange={handleChangeAvatar}
                      />
                    </Button>
                  </Box>
                  {errorInfoPet.avartar && (
                    <Typography mt={1} variant="caption" color="error">{errorInfoPet.avartar}</Typography>
                  )}
                </Grid>

                {/* --------- Thông tin thú cưng ----------- */}
                <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                  <PetInformation
                    onInputChange={handleInputInfoPetChange}
                    formDataInfoPet={formDataInfoPet}
                    errorInfoPet={errorInfoPet}
                  />
                </Grid>

                {/* --------- Thông tin y tế thú cưng ----------- */}
                <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                  <PetHealthInformation
                    onInputChange={handleInputInfoHealthPetChange}
                    formDataInforHealthPet={formDataInfoHealthPet}
                    errorInfoHealthPet={errorInfoHealthPet}
                  />
                </Grid>

                {/* --------- Tiêm phòng ----------- */}
                <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                  <Vaccination
                    onInputChange={handleInputVaccinationChange}
                    formDataVaccination={formDataVaccination}
                    errorVaccination={errorVaccination}
                  />
                </Grid>

                {/* --------- Tẩy giun ----------- */}
                <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                  <Deworming
                    onInputChange={handleInputDewormingChange}
                    formDataDeworming={formDataDeworming}
                    errorDeworming={errorDeworming}
                  />
                </Grid>

                {/* --------- Khám định kỳ thú cưng ----------- */}
                <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                  <RegularVetCheckup
                    onInputChange={handleInputRegularVetCheckupChange}
                    formDataRegularVetCheckup={formDataRegularVetCheckup}
                    errorRegularVetCheckup={errorRegularVetCheckup}
                  />
                </Grid>

                {/* --------- Chế độ dinh dưỡng đặc biệt ----------- */}
                <Grid sx={{ mt: 2.5 }} size={{ xs: 12 }}>
                  <SpecialNutritionalPlan
                    onInputChange={handleInputSpecialNutritionalPlanChange}
                    formDataSpecialNutritionalPlan={formDataSpecialNutritionalPlan}
                    errorSpecialNutritionalPlan={errorSpecialNutritionalPlan}
                  />
                </Grid>

                {/* ----------- Nút ------------- */}
                <Grid
                  size={{ xs: 12 }}
                  sx={{ mt: 2.5, gap: 1, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button
                    onClick={handleSave}
                    sx={{ bgcolor: COLORS.PRIMARY, width: 120, borderRadius: 2 }}
                  >
                    Tạo hồ sơ
                  </Button>
                  <Button
                    variant='outlined'
                    sx={{
                      border: `1px solid ${COLORS.PRIMARY}`,
                      color: COLORS.PRIMARY,
                      width: 120,
                      borderRadius: 2,
                    }}
                    onClick={handleClose}
                  >
                    Hủy
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant='subtitle2' fontWeight={500}>
                Hình ảnh cập nhật thú cưng
              </Typography>
              <Box
                flexDirection='column'
                mt={5}
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                <CommonImage src={image_pet} sx={{ width: '50%', height: '50%', mb: 4 }} />
                <Typography
                  align='center'
                  variant='h6'
                  sx={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
                >
                  Bạn chưa có hình ảnh cập nhật của thú cưng
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {isSubmitting && <Backdrop open={isSubmitting} />}
      </Box>
    );
}

export default CreateProfilePet;
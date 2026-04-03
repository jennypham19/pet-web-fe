import Backdrop from "@/components/Backdrop";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { uploadImage } from "@/services/upload-service";
import { updateProfile } from "@/services/user-service";
import { setProfile } from "@/slices/user";
import { useAppDispatch } from "@/store";
import { FormErrorsUser } from "@/types/errors";
import { FormDataUser, IUser, PayloadUser } from "@/types/user";
import { resizeImage } from "@/utils/common";
import { Badge, ContactPage } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface EditProfileProps {
    onClose: () => void;
    profile: IUser;
}

const EditProfile = (props: EditProfileProps) => { 
    const { onClose, profile } = props;
    const dispatch = useAppDispatch();
    const notify = useNotification();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [urlImage, setUrlImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<FormErrorsUser>({});
    const [formData, setFormData] = useState<FormDataUser>({ avatar: null, name: '', gender: null, dob: null, cccd: '', position: '', title: '', professionalBiography: '', email: '', phone: '', address: ''});

    useEffect(() => {
        if(profile){
            setUrlImage(profile.avatarUrl);
            setFormData({
                avatar: null,
                name: profile.name,
                gender: profile.gender ? profile.gender : null,
                dob: profile.dob ? dayjs(profile.dob) : null,
                cccd: profile.cccd,
                position: profile.position,
                title: profile.title,
                professionalBiography: profile.professionalBiography,
                email: profile.email,
                phone: profile.phone,
                address: profile.address
            })
        }
    }, [profile])

    const reset = () => {
        setErrors({});
        setFormData({ avatar: null, name: '', gender: null, dob: null, cccd: '', position: '', title: '', professionalBiography: '', email: '', phone: '', address: ''})
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    const handleChangeAvatar = async(event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file && file.type.startsWith('image/')){
            const { blob, previewUrl } = await resizeImage(file, 800);
            const newFile = new File([blob], file.name, { type: "image/*"});
            setFormData(prev => ({ ...prev, avatar: newFile }));
            setUrlImage(previewUrl);
            setErrors(prev => ({ ...prev, avatar: undefined }));
        }else{
            setUrlImage(null);
            event.target.value = "";
        }

        // reset lại input để onChange được gọi nếu chọn lại cùng 1 ảnh
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }

    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

    const handleChangeInput = (name: string, value: any) => {
        const validName = name as keyof FormDataUser;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if(validName === 'phone' && typeof value === 'string') {
            const phone = value.replace(/\s|-/g, '');
            if(!/^\d+$/.test(phone)){
                setErrors(prev => ({ ...prev, phone: 'Số điện thoại chỉ chứa số' }))
                return;
            }

            if(phone.startsWith('0') && phone.length !== 10){
                setErrors(prev => ({ ...prev, phone: 'Số điện thoại phải có 10 chữ số (nếu bắt đầu bằng 0)'}));
                return;
            }

            if(phone.startsWith('+84') && (phone.length < 11 || phone.length > 12)){
                setErrors(prev => ({ ...prev, phone: 'Số điện thoại phải có 11-12 chữ số (nếu bắt đầu bằng +84)'}));
                return;
            }

            if(!phoneRegex.test(phone)){
                setErrors(prev => ({ ...prev, phone: 'Số điện thoại không đúng định dạng (bắt đầu từ +84|03|05|07|08|09)'}));
                return;
            }
        };

        if(validName === 'email' && typeof value === 'string'){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // chuẩn email đơn giản
            if(!emailRegex.test(value)){
                setErrors(prev => ({ ...prev, email: 'Email không hợp lệ' }));
                return;
            }
        }

        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }   

    const validate = (): boolean => {
        const newErrors: FormErrorsUser = {};
        if(!formData.avatar) newErrors.avatar = "Vui lòng chọn ảnh đại diện";
        if(!formData.name) newErrors.name = "Vui lòng nhập họ tên";
        if(!formData.gender) newErrors.gender = "Vui lòng chọn giới tính";
        if(!formData.dob) newErrors.dob = "Vui lòng chọn ngày sinh";
        if(!formData.cccd) newErrors.cccd = "Vui lòng nhập số căn cước";
        if(!formData.position) newErrors.position = "Vui lòng nhập chức vụ";
        if(!formData.title) newErrors.title = "Vui lòng nhập danh hiệu";
        if(!formData.email) newErrors.email = "Vui lòng nhập email";
        if(!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
        if(!formData.address) newErrors.address = "Vui lòng nhập địa chỉ";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSave = async() => {
        if(!validate()) return;
        setIsSubmitting(true);
        try {
            let uploadResponse: any;
            uploadResponse = await uploadImage(formData.avatar!, 'users');
            if (!uploadResponse.success || !uploadResponse.data?.file) {
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
            }

            const payload: PayloadUser = {
                avatarUrl: uploadResponse.data.file.imageUrl,
                name: formData.name,
                gender: formData.gender ? formData.gender : null,
                dob: formData.dob ? formData.dob : null,
                cccd: formData.cccd ? formData.cccd : null,
                position: formData.position ? formData.position : null,
                title: formData.title ? formData.title : null,
                email: formData.email ? formData.email : null,
                phone: formData.phone ? formData.phone : null,
                address: formData.address ? formData.address : null,
                professionalBiography: formData.professionalBiography ? formData.professionalBiography : null
            }
            const res = await updateProfile(profile.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            const newData = res.data as any as IUser;
            dispatch(setProfile(newData))
            handleClose()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false);
        }
    }
    return(
        <Box p={3}>
            <Stack>
                <Typography variant="caption">Nhân sự</Typography>
                <Typography variant="caption">{`>`}</Typography>
                <Typography variant="caption" sx={{ color: COLORS.PRIMARY }}>Chỉnh sửa hồ sơ</Typography>
            </Stack>
            <Typography 
                variant="h5" 
                fontWeight={600}
                mb={3}
            >
                Hồ sơ người dùng
            </Typography>
            <Grid container spacing={2}>
                {/* Ảnh đại diện */}
                <Grid size={{ xs: 12, md: 3.5 }}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ borderRadius: '50%', p: 1, border: errors.avatar ? `2px solid #e22b2b` : `2px solid ${COLORS.PRIMARY}`, width: 220, height: 220 }}>
                            <Avatar
                                src={urlImage || undefined}
                                sx={{
                                    width: 200,
                                    height: 200,
                                    mb: 2,
                                    bgcolor: 'grey.500',
                                    borderRadius: '50%',
                                }}
                            />
                        </Box>
                        {errors.avatar && (
                            <Typography variant="caption" color="error">{errors.avatar}</Typography>
                        )}
                        <Button
                            variant='outlined'
                            sx={{
                                mt: 1,
                                borderRadius: 8,
                                px: 3.5, py: 1,
                                border: `1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY
                            }}
                            component='label'
                        >
                            <input
                                ref={fileInputRef}
                                type='file'
                                hidden
                                accept='image/*'
                                onChange={handleChangeAvatar}
                            />
                            Thay đổi ảnh đại diện
                        </Button>
                        <Typography variant="caption">Định dạng JPG, PNG</Typography>
                    </Paper>
                </Grid>

                {/* Thông tin chi tiết */}
                <Grid size={{ xs: 12, md: 8.5 }}>
                    <Paper sx={{ p: 3 }}>
                        {/* Thông tin cá nhân */}
                        <Stack>
                            <Badge/>
                            <Typography fontWeight={500}>Thông tin cá nhân</Typography>
                        </Stack>
                        <Divider sx={{ my: 1.5 }}/>
                        <Grid container spacing={2}>
                            <Grid size={{ md: 6}}>
                                <Typography variant="caption" fontWeight={500}>HỌ VÀ TÊN</Typography>
                                <InputText
                                    label=""
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChangeInput}
                                    type="text"
                                    margin="dense"
                                    placeholder="Nhập họ tên"
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid size={{ md: 6}}>
                                <Typography variant="caption" fontWeight={500}>GIỚI TÍNH</Typography>
                                <InputSelect
                                    label=""
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChangeInput}
                                    margin="dense"
                                    options={[
                                        { id: 1, label: 'Nam', value: 'male'},
                                        { id: 1, label: 'Nữ', value: 'female'}
                                    ]}
                                    placeholder="Chọn giới tính"
                                    error={!!errors.gender}
                                    helperText={errors.gender}
                                />
                            </Grid>
                            <Grid size={{ md: 6}}>
                                <Typography variant="caption" fontWeight={500}>NGÀY SINH</Typography>
                                <InputText
                                    label=""
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChangeInput}
                                    type="date"
                                    margin="dense"
                                    placeholder="Nhập ngày sinh"
                                    error={!!errors.dob}
                                    helperText={errors.dob}
                                />
                            </Grid>
                            <Grid size={{ md: 6}}>
                                <Typography variant="caption" fontWeight={500}>CCCD</Typography>
                                <InputText
                                    label=""
                                    name="cccd"
                                    value={formData.cccd}
                                    onChange={handleChangeInput}
                                    type="text"
                                    margin="dense"
                                    placeholder="Nhập số CCCD"
                                    error={!!errors.cccd}
                                    helperText={errors.cccd}
                                />
                            </Grid>
                            <Grid size={{ md: 6}}>
                                <Typography variant="caption" fontWeight={500}>VỊ TRÍ</Typography>
                                <InputText
                                    label=""
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChangeInput}
                                    type="text"
                                    margin="dense"
                                    placeholder="Nhập vị trí"
                                    error={!!errors.position}
                                    helperText={errors.position}
                                />
                            </Grid> 
                            <Grid size={{ md: 6}}>
                                <Typography variant="caption" fontWeight={500}>CHỨC VỤ</Typography>
                                <InputText
                                    label=""
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChangeInput}
                                    type="text"
                                    margin="dense"
                                    placeholder="Nhập chức vụ"
                                    error={!!errors.title}
                                    helperText={errors.title}
                                />
                            </Grid> 
                            <Grid size={{ md: 12 }}>
                                <Typography variant="caption" fontWeight={500}>TIỂU SỬ NGHỀ NGHIỆP</Typography>
                                <InputText
                                    multiline
                                    rows={4}
                                    label=""
                                    name="professionalBiography"
                                    value={formData.professionalBiography}
                                    onChange={handleChangeInput}
                                    type="text"
                                    margin="dense"
                                    placeholder="Nhập tiểu sử nghề nghiệp"
                                />
                            </Grid>   
                        </Grid>
                        {/* Liên hệ */}
                        <Stack mt={3}>
                            <ContactPage/>
                            <Typography fontWeight={500}>Liên hệ</Typography>
                        </Stack>
                        <Divider sx={{ my: 1.5 }}/>
                        <Grid container spacing={2}>
                            <Grid size={{ md: 6}}>
                                <Typography variant="caption" fontWeight={500}>EMAIL</Typography>
                                <InputText
                                    label=""
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChangeInput}
                                    type="text"
                                    margin="dense"
                                    placeholder="Nhập email"
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid size={{ md: 6}}>
                                <Typography variant="caption" fontWeight={500}>SỐ ĐIỆN THOẠI</Typography>
                                <InputText
                                    label=""
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChangeInput}
                                    type="text"
                                    margin="dense"
                                    placeholder="Nhập số điện thoại"
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                            </Grid>
                            <Grid size={{ md: 12 }}>
                                <Typography variant="caption" fontWeight={500}>ĐỊA CHỈ THƯỜNG TRÚ</Typography>
                                <InputText
                                    multiline
                                    rows={4}
                                    label=""
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChangeInput}
                                    type="text"
                                    margin="dense"
                                    placeholder="Nhập địa chỉ thường trú"
                                    error={!!errors.address}
                                    helperText={errors.address}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={3} display='flex' justifyContent='flex-end' gap={2}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: 5, p: 1, width: 200,
                                    border: `1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY 
                                }}
                                onClick={handleClose}
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={handleSave}
                                sx={{
                                    borderRadius: 5, p: 1, width: 200 
                                }}
                            >
                                Lưu hồ sơ
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            {isSubmitting && <Backdrop open={isSubmitting} />}
        </Box>
    )
}

export default EditProfile;
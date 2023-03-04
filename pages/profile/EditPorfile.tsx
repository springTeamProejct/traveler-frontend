import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Form, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

interface EditProfileDialogProps {
  open: boolean;
  handleClose: () => void;
}
export default function EditProfile({
  open,
  handleClose,
}: EditProfileDialogProps) {
  const EditProfileSchema = Yup.object().shape({
    nickname: Yup.string()
      .min(2, "너무 짧아요.")
      .max(50, "너무 길어요.")
      .required("필수항목 이예요."),
    email: Yup.string()
      .email("이메일 형식으로 입력해주세요.")
      .required("필수항목 이예요."),
    password: Yup.string()
      .required("필수항목 이예요.")
      .min(8, "글자 수는 8~16  입니다.")
      .max(16, "글자 수는 8~16  입니다.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "특수 문자가 하나이상 포함되어야합니다.(!, @, #, $, %, ^, &, *)"
      ),
    confirmPassword: Yup.string()
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "비밀번호가 다릅니다."),
      })
      .required("필수할목 이에요."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
    validationSchema: EditProfileSchema,
    onSubmit: async (values: any) => {
      handleClose();
    },
  });

  const [uploadedImage, setSelectedImage] = useState("");
  const [noneOrBlock, setNoneOrBlock] = useState("none");
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const newImage = e.target?.result;

        setSelectedImage(newImage as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleActivityButtonClick = () => {
    const input = document.getElementById("avatar-input");
    if (input) {
      input.click();
    }
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>프로필 수정</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                p: 2,
              }}
            >
              <InputLabel htmlFor="avatar-input">
                <Avatar
                  sx={{ width: 200, height: 200 }}
                  alt="User Avatar"
                  src={uploadedImage}
                  onMouseEnter={(e: any) => setNoneOrBlock("block")}
                  onMouseLeave={(e: any) => setNoneOrBlock("none")}
                >
                  <IconButton
                    onClick={handleActivityButtonClick}
                    sx={{
                      display: { noneOrBlock },
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Edit sx={{ display: noneOrBlock }} />
                  </IconButton>
                </Avatar>
              </InputLabel>
              <input
                accept="image/*"
                id="avatar-input"
                type="file"
                onChange={handleFileInputChange}
              />
            </Box>

            <TextField
              fullWidth
              label="별명"
              name="nickname"
              value={formik.values.nickname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.nickname && formik.errors.nickname)}
              helperText={formik.touched.nickname && formik.errors.nickname}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              helperText={formik.touched.email && formik.errors.email}
              error={Boolean(formik.touched.email && formik.errors.email)}
              margin="normal"
            />
            <TextField
              fullWidth
              type="password"
              autoComplete="new-password"
              label="비밀번호"
              name="password"
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              margin="normal"
            />
            <TextField
              fullWidth
              type="password"
              autoComplete="new-password"
              label="비밀번호 확인"
              name="confirmPassword"
              error={Boolean(
                formik.touched.confirmPassword && formik.errors.confirmPassword
              )}
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              저장
            </Button>
            <Button onClick={handleClose}>취소</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { Loader2 } from "lucide-react";
import { useController, type Control } from "react-hook-form";

import type { PhotoInputType } from "@/types/form-inputs-type";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type PhotoInputProps = {
  input: PhotoInputType;
  control: Control<any>;
};

export const PhotoInput = ({ input, control }: PhotoInputProps) => {
  const {
    field: { onChange },
  } = useController({
    control: control,
    name: input.name,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setLoading(true);

    const imageFile = event.target.files[0];
    setPreviewUrl(URL.createObjectURL(imageFile));
    const options = {
      maxSizeMB: 0.25,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);

      onChange(compressedFile);
      // handleSaveAvatar(compressedFile);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // const handleSaveAvatar = (file: File) => {
  //   getBase64(file)
  //     .then((res) => {
  //       onChange(res);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // };

  // const getBase64 = (file: Blob) => {
  //   return new Promise((resolve) => {
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         resolve((reader.result as string).split(",")[1]);
  //       };
  //     } else {
  //       resolve("");
  //     }
  //   });
  // };

  return (
    <FormField
      control={control}
      name={input.name}
      render={({ field: { value, ref, name, onBlur, disabled } }) => (
        <FormItem>
          {input?.label && <FormLabel>{input?.label}</FormLabel>}

          <FormControl>
            <div className="relative">
              <Input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
                ref={(Ref) => {
                  ref(Ref);
                  inputRef.current = Ref;
                }}
                {...input.props}
                name={name}
                onBlur={onBlur}
                disabled={disabled}
              />

              <div className="absolute top-1 right-2">
                {loading ? (
                  <Loader2 className="size-7 animate-spin" />
                ) : (
                  previewUrl && <img alt="photo" className="size-7" src={previewUrl} />
                )}

                {typeof value === "string" && !previewUrl && (
                  <img alt="photo" className="size-7" src={value} />
                )}
              </div>
            </div>
          </FormControl>

          {input?.desc && <FormDescription>{input?.desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

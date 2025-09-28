import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <>
      <p className="text-3xl font-semibold m-4">{t("Settings")}</p>
      <div className="m-4">
        <Card className="max-w-sm bg-white">
          <CardContent>
            <label htmlFor="language" className="block mb-1 text-sm">
              {t("Change the Language of the App")}
            </label>
            <Select
              onValueChange={(value) => i18n.changeLanguage(value)}
              defaultValue={i18n.language}
            >
              <SelectTrigger className="w-[180px] mb-4">
                <SelectValue placeholder="Select a Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="or">Oriya</SelectItem>
                  <SelectItem value="ml">Malyalam</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <label htmlFor="theme" className="block mt-2 text-lg text-sm mb-1">
              {t("Change the Theme")}
            </label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Blue Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Theme</SelectLabel>
                  <SelectItem value="Blue Filter">Blue Filter</SelectItem>
                  <SelectItem value="Dark Mode">Dark Mode</SelectItem>
                  <SelectItem value="Tokyo Night">Tokyo Night</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      <Button className="m-4">{t("Save Changes")}</Button>
    </>
  );
}

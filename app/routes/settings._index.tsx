/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate, useSubmit } from "react-router";
import {
  useInventory,
  usePreferences,
  useTranslate
} from "~/components/app-context";
import { EditorRange } from "~/components/editor-range";
import { EditorToggle } from "~/components/editor-toggle";
import { useCheckbox } from "~/components/hooks/use-checkbox";
import { useStorageState } from "~/components/hooks/use-storage-state";
import { useSync } from "~/components/hooks/use-sync";
import { LanguageSelect } from "~/components/language-select";
import { Modal, ModalHeader } from "~/components/modal";
import { ModalButton } from "~/components/modal-button";
import { confirm } from "~/components/modal-generic";
import { Select } from "~/components/select";
import { SettingsLabel } from "~/components/settings-label";
import { backgrounds } from "~/data/backgrounds";
import { languages } from "~/data/languages";
import { SyncAction } from "~/data/sync";
import { middleware } from "~/http.server";
import { getMetaTitle } from "~/root-meta";
import type { Route } from "./+types/settings._index";
import { ApiActionPreferencesUrl } from "./api.action.preferences._index";

export const meta = getMetaTitle("HeaderSettingsLabel");

export async function loader({ request }: Route.LoaderArgs) {
  await middleware(request);
  return null;
}

export default function Settings() {
  const {
    background: selectedBackground,
    hideFilters: selectedHideFilters,
    hideFreeItems: selectedHideFreeItems,
    hideNewItemLabel: selectedHideNewItemLabel,
    language: selectedLanguage,
    statsForNerds: selectedStatsForNerds
  } = usePreferences();
  const [inventory, setInventory] = useInventory();
  const translate = useTranslate();
  const sync = useSync();

  const [background, setBackground] = useState(selectedBackground ?? "");
  const [hideFilters, setHideFilters] = useCheckbox(selectedHideFilters);
  const [hideFreeItems, setHideFreeItems] = useCheckbox(selectedHideFreeItems);
  const [hideNewItemLabel, setHideNewItemLabel] = useCheckbox(
    selectedHideNewItemLabel
  );
  const [language, setLanguage] = useState(selectedLanguage);
  const [statsForNerds, setStatsForNerds] = useCheckbox(selectedStatsForNerds);
  const [volume, setVolume] = useStorageState("appVolume", 1);

  const submit = useSubmit();
  const navigate = useNavigate();

  function handleSubmit() {
    submit(
      {
        background,
        hideFilters,
        hideFreeItems,
        hideNewItemLabel,
        language,
        statsForNerds
      },
      {
        action: ApiActionPreferencesUrl,
        method: "POST"
      }
    );
  }

  async function handleRemoveAllItems() {
    if (
      await confirm({
        titleText: translate("SettingsRemoveAllItems"),
        bodyText: translate("SettingsConfirmRemoveAllItems"),
        cancelText: translate("EditorCancel"),
        confirmText: translate("InventoryItemStorageUnitEmptyClose")
      })
    ) {
      inventory.removeAll();
      setInventory(inventory);
      sync({ type: SyncAction.RemoveAllItems });
      return navigate("/");
    }
  }

  return (
    <Modal className="w-[540px]">
      <ModalHeader title={translate("SettingsHeader")} linkTo="/" />
      <div className="mt-2 space-y-2 px-2">
        <SettingsLabel label={translate("SettingsMasterVolume")}>
          <EditorRange
            format={(value) => (value * 100).toFixed(0).toString()}
            max={1}
            min={0}
            onChange={setVolume}
            step={0.01}
            value={volume}
            valueStyles="w-5 text-right"
          />
        </SettingsLabel>
        <SettingsLabel label={translate("SettingsLanguage")}>
          <LanguageSelect
            languages={languages.map(({ name, countries }) => ({
              name,
              country: countries[0]
            }))}
            value={language}
            onChange={setLanguage}
          />
        </SettingsLabel>
        <SettingsLabel label={translate("SettingsBackground")}>
          <Select
            value={background ?? ""}
            onChange={setBackground}
            options={[
              {
                label: translate("SettingsBackgroundRandom"),
                value: ""
              },
              ...backgrounds
            ]}
            children={({ label }) => label}
          />
        </SettingsLabel>
        <SettingsLabel label={translate("SettingsStatsForNerds")}>
          <EditorToggle checked={statsForNerds} onChange={setStatsForNerds} />
        </SettingsLabel>
        <SettingsLabel label={translate("SettingsHideFreeItems")}>
          <EditorToggle checked={hideFreeItems} onChange={setHideFreeItems} />
        </SettingsLabel>
        <SettingsLabel label={translate("SettingsHideFilters")}>
          <EditorToggle checked={hideFilters} onChange={setHideFilters} />
        </SettingsLabel>
        <SettingsLabel label={translate("SettingsHideNewLabel")}>
          <EditorToggle
            checked={hideNewItemLabel}
            onChange={setHideNewItemLabel}
          />
        </SettingsLabel>
        {inventory.size() > 0 && (
          <button
            className="font-display flex h-12 w-full cursor-default items-center gap-3 rounded-sm border border-neutral-500/20 bg-neutral-800/50 px-3 py-1 text-red-500 transition-all hover:ring-2 hover:ring-red-500"
            onClick={handleRemoveAllItems}
          >
            <FontAwesomeIcon icon={faTrashCan} className="h-4" />
            {translate("SettingsRemoveAllItems")}
          </button>
        )}
      </div>
      <div className="my-6 flex justify-center gap-2 px-4">
        <ModalButton
          children={translate("SettingsSave")}
          onClick={handleSubmit}
          variant="primary"
        />
      </div>
    </Modal>
  );
}

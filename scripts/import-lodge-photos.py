#!/usr/bin/env python3
"""Import every official lodge photo and generate the media registry."""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

SRC = Path("/Users/djibyniang/Documents/JENNY DOSSIER SAFARI COMPLET/LODGES ")
DEST = Path("/Users/djibyniang/Projects/Serenova/public/images/official/lodges")
MEDIA_OUT = Path("/Users/djibyniang/Projects/Serenova/src/content/lodge-media.ts")
GALLERY_OUT = Path("/Users/djibyniang/Projects/Serenova/src/content/lodge-galleries.ts")
EXTS = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".tif", ".tiff"}

LODGES = [
    {
        "folder": "tulia boutique spa",
        "slug": "lodge-tulia",
        "name": "Tulia Boutique & Spa",
        "alt": "Tulia Boutique Hotel and Spa, Arusha",
        "prefer": ["Arusha-Tulia-Boutique-Hotel-and-Spa-1-1.webp", "tulia-boutique-hotel.jpg"],
    },
    {
        "folder": "under the shade",
        "slug": "lodge-under-the-shade",
        "name": "Under the Shade",
        "alt": "Under the Shade, Arusha",
        "prefer": ["caption (1).jpg", "room-1.webp"],
    },
    {
        "folder": "mount meru",
        "slug": "lodge-mount-meru",
        "name": "Mount Meru Hotel",
        "alt": "Mount Meru Hotel, Arusha",
        "prefer": ["295446252.jpg", "room-at-mount-meru-hotel.jpg.webp"],
    },
    {
        "folder": "gran mellia",
        "slug": "lodge-gran-melia-arusha",
        "name": "Gran Meliá Arusha",
        "alt": "Gran Meliá Arusha",
        "prefer": ["caption.jpg"],
    },
    {
        "folder": "kika resort",
        "slug": "lodge-kika",
        "name": "Kika Resort",
        "alt": "Kika Resort, Arusha",
        "prefer": ["our-hotel-infront.jpg", "kika-resort-hotel (2).jpg"],
    },
    {
        "folder": "farm of dreams",
        "slug": "lodge-farm-of-dreams",
        "name": "Farm of Dreams Lodge",
        "alt": "Farm of Dreams Lodge, Karatu",
        "prefer": ["01-Farm-of-Dream-Lodge-Karatu1.jpg"],
    },
    {
        "folder": "baobao tented Tarangire",
        "slug": "lodge-baobab-tented",
        "name": "Baobab Tented Camp",
        "alt": "Baobab Tented Camp, Tarangire",
        "prefer": ["camp-team-welcoming-guests-baobab-tented-camp.webp"],
    },
    {
        "folder": "elephant tarangire",
        "slug": "lodge-elephant-springs",
        "name": "Tarangire Elephant Springs",
        "alt": "Tarangire Elephant Springs",
        "prefer": ["Tarangire-Elephant-Springs-ES_Swimming_Pool_3-scaled-1.jpeg"],
    },
    {
        "folder": "kuro treetop",
        "slug": "lodge-kuro-treetops",
        "name": "Kuro Treetops Lodge",
        "alt": "Kuro Treetops Lodge, Tarangire",
        "prefer": ["caption.jpg", "TKTL-2.jpg"],
    },
    {
        "folder": "TARANGIRE NATURE",
        "slug": "lodge-tarangire-nature",
        "name": "Tarangire Nature Camp",
        "alt": "Tarangire Nature Camp",
        "prefer": ["IMG_5309.jpg"],
    },
    {
        "folder": "nyuki camp",
        "slug": "lodge-nyuki",
        "name": "Nyuki Camp",
        "alt": "Nyuki Camp, Tarangire",
        "prefer": ["GWS_0837.webp"],
    },
    {
        "folder": "bougainvillea",
        "slug": "lodge-bougainvillea",
        "name": "Bougainvillea Safari Lodge",
        "alt": "Bougainvillea Safari Lodge, Karatu",
        "prefer": ["caption.jpg", "Bougainvillea-Safari-Lodge-3.jpeg"],
    },
    {
        "folder": "forest hill",
        "slug": "lodge-forest-hill",
        "name": "Forest Hill Hotel",
        "alt": "Forest Hill Hotel, Karatu",
        "prefer": ["caption.jpg", "10.jpg"],
    },
    {
        "folder": "kitela lodge",
        "slug": "lodge-kitela",
        "name": "Kitela Lodge",
        "alt": "Kitela Lodge, Karatu",
        "prefer": ["kitela-lodge-room-suite-interior-04.402842fa.jpg", "caption.jpg"],
    },
    {
        "folder": "serenity camp",
        "slug": "lodge-serenity",
        "name": "Serenity Camp",
        "alt": "Serenity Camp, Ngorongoro",
        "prefer": ["caption (1).jpg", "69710458a4645a9ae584c032_Serenity Camp3.jpg"],
    },
    {
        "folder": "CRATER EDGE",
        "slug": "lodge-crater-edge",
        "name": "Crater Edge",
        "alt": "Crater Edge, Ngorongoro",
        "skip": ["arusha-coffee-lodge-f30.webp"],
        "prefer": ["Wilderness-Collection_0008.jpg", "caption.jpg"],
    },
    {
        "folder": "gran mellia ngorongoro",
        "slug": "lodge-gran-melia-ngorongoro",
        "name": "Gran Meliá Ngorongoro",
        "alt": "Gran Meliá Ngorongoro Lodge",
        "prefer": ["01TNMI-IM0201-melia-ngorongoro-lodge.jpg", "caption.jpg"],
    },
    {
        "folder": "lion ngorongoro camp",
        "slug": "lodge-lions-paw",
        "name": "Ngorongoro Lion’s Paw Camp",
        "alt": "Ngorongoro Lion’s Paw Camp",
        "prefer": ["01TNLP-IM0001-ngorongoro-lions-paw-camp-1920.jpg"],
    },
    {
        "folder": "LAKE MASEK TENTED LODGE",
        "slug": "lodge-lake-masek",
        "name": "Lake Masek Tented Lodge",
        "alt": "Lake Masek Tented Lodge, Ndutu",
        "prefer": ["lakemasekcamp3.jpg"],
    },
    {
        "folder": "shuhudia",
        "slug": "lodge-shuhudia",
        "name": "Shuhudia Adventure Camp",
        "alt": "Shuhudia Adventure Camp, Serengeti",
        "prefer": ["caption.jpg", "shuhudia-single-tent-new-banner.webp"],
    },
    {
        "folder": "tukaone serengeti",
        "slug": "lodge-tukaone",
        "name": "Tukaone Serengeti Camp",
        "alt": "Tukaone Serengeti Camp",
        "prefer": ["Tukaone-Serengeti-Weavers-Camp-Exterior.jpg", "Tukaone-Serengeti-Weavers-Camp.jpg"],
    },
    {
        "folder": "kubu kubu tent lodge",
        "slug": "lodge-kubu-kubu",
        "name": "Kubu Kubu Tented Lodge",
        "alt": "Kubu Kubu Tented Lodge, Serengeti",
        "prefer": ["Kubu-Kubu-6.webp"],
    },
    {
        "folder": "MOYO CENTRAL",
        "slug": "lodge-moyo-central",
        "name": "Moyo Camp Central",
        "alt": "Moyo Camp Central, Serengeti",
        "prefer": ["MOYO-BKG-1920-01.webp", "Warangi-moyo-wallpaper-LD.webp"],
    },
    {
        "folder": "moyo camp north sere",
        "slug": "lodge-moyo-north",
        "name": "Moyo Camp North",
        "alt": "Moyo Camp North, Serengeti",
        "prefer": ["Lower-2.webp"],
    },
    {
        "folder": "river mara serengeti",
        "slug": "lodge-river-camp",
        "name": "Serengeti River Camp",
        "alt": "Serengeti River Camp, northern Serengeti",
        "prefer": ["RC_Pool_1-scaled.jpg", "serengetirivercamp3.jpg"],
    },
    {
        "folder": "sametu serengeti",
        "slug": "lodge-sametu",
        "name": "Sametu Camp",
        "alt": "Sametu Camp, Serengeti",
        "prefer": ["Serengeti-Sametu-Camp-Executive-Suite-View-jpg.webp", "sametu-camp-05.webp"],
    },
    {
        "folder": "salinero hotel",
        "slug": "lodge-salinero",
        "name": "Salinero Serengeti Lodge",
        "alt": "Salinero Serengeti Lodge",
        "prefer": ["IM_TZ_SER_Salinero-Serengeti_Aerial-view-of-tents.webp", "Pool-Salinero-Serengeti-Lodge.webp"],
    },
    {
        "folder": "The mora zanziba",
        "slug": "lodge-the-mora",
        "name": "The Mora Zanzibar",
        "alt": "The Mora Zanzibar",
        "prefer": ["caption.jpg", "The_Mora_Zanzibar_Sport_Pool6.jpg"],
    },
]


def list_images(folder: Path, skip: list[str]) -> list[Path]:
    files = []
    for item in folder.iterdir():
        if item.name.startswith("."):
            continue
        if item.name in skip:
            continue
        if item.suffix.lower() not in EXTS:
            continue
        files.append(item)
    return files


def ordered(files: list[Path], prefer: list[str]) -> list[Path]:
    by_name = {item.name: item for item in files}
    out: list[Path] = []
    for name in prefer:
        if name in by_name:
            out.append(by_name.pop(name))
    out.extend(sorted(by_name.values(), key=lambda p: p.name.lower()))
    return out


def convert(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["sips", "-s", "format", "jpeg", "-Z", "2000", str(src), "--out", str(dest)],
        check=True,
        capture_output=True,
    )


def ts_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def main() -> None:
    records = []
    galleries: dict[str, list[str]] = {}
    imported = 0
    skipped = 0

    for lodge in LODGES:
        folder = SRC / lodge["folder"]
        if not folder.is_dir():
            raise SystemExit(f"Missing folder: {folder}")
        files = ordered(list_images(folder, lodge.get("skip", [])), lodge.get("prefer", []))
        if not files:
            raise SystemExit(f"No images in {folder}")
        ids = []
        for index, src in enumerate(files, start=1):
            media_id = lodge["slug"] if index == 1 else f"{lodge['slug']}-{index:02d}"
            dest = DEST / lodge["slug"] / f"{media_id}.jpg"
            convert(src, dest)
            imported += 1
            ids.append(media_id)
            records.append(
                {
                    "id": media_id,
                    "slug": lodge["slug"],
                    "name": lodge["name"],
                    "alt": lodge["alt"] if index == 1 else f"{lodge['alt']} — {index}",
                    "src": f"/images/official/lodges/{lodge['slug']}/{media_id}.jpg",
                    "credit": f"Jenny dossier — LODGES / {lodge['folder']}",
                    "source": src.name,
                }
            )
            print(f"{imported:02d} {media_id} ← {src.name}")
        galleries[lodge["slug"]] = ids
        skipped += len(lodge.get("skip", []))

    lines = [
        'import type { MediaAsset } from "./types";',
        "",
        "export const lodgeMedia = {",
    ]
    for item in records:
        lines.append(f'  "{item["id"]}": {{')
        lines.append(f'    id: "{item["id"]}",')
        lines.append("    kind: \"image\",")
        lines.append(f'    src: "{item["src"]}",')
        lines.append(f'    alt: "{ts_escape(item["alt"])}",')
        lines.append(f'    credit: "{ts_escape(item["credit"])}",')
        lines.append('    status: "official",')
        lines.append("  },")
    lines.append("} satisfies Record<string, MediaAsset>;")
    lines.append("")
    MEDIA_OUT.write_text("\n".join(lines) + "\n")

    gallery_lines = ["export const lodgeGalleries = {"]
    for slug, ids in galleries.items():
        joined = ", ".join(f'"{item}"' for item in ids)
        gallery_lines.append(f'  "{slug}": [{joined}],')
    gallery_lines.append("} as const;")
    gallery_lines.append("")
    GALLERY_OUT.write_text("\n".join(gallery_lines) + "\n")

    print(json.dumps({"imported": imported, "skipped": skipped, "lodges": len(LODGES)}, indent=2))


if __name__ == "__main__":
    main()

import { Request, Response } from "express";
import axios from "axios";
import { FIGMA_TOKEN } from "../config";

// Fetch Figma files
export const fetchFigmaFiles = async (req: Request, res: Response) => {
  const figmaToken = FIGMA_TOKEN;

  if (!figmaToken) {
    res.status(400).send({ error: "Figma token is missing" });
    return;
  }

  try {
    const response = await axios.get("https://api.figma.com/v1/me/files", {
      headers: {"Authorization": `Bearer ${figmaToken}`},
    });
    const files = response.data.files;
    res.send(files);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
};

// Fetch Figma page information
export const fetchPageInfo = async (req: Request, res: Response) => {
  const { fileKey, pageId } = req.params;

  if (!FIGMA_TOKEN) {
    res.status(400).send({ error: "Figma token is missing" });
    return;
  }

  try {
    const response = await axios.get(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {"Authorization": `Bearer ${FIGMA_TOKEN}`},
    });
    const pages = response.data.document.children;
    const pageInfo = pages.find((page: any) => page.id === pageId);

    if (!pageInfo) {
      res.status(404).send({ error: "Page not found" });
      return;
    }

    res.send(pageInfo);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
};

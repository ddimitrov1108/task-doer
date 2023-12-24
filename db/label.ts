import prisma from "@/lib/prisma";

export interface ILabel {
  id: number;
  name: string;
}

const formatLabelName = (labelName: string) =>
  labelName.toLowerCase().replace(/\s+/g, "-");

const getLabels = async (userId: number) => {
  try {
    return await prisma.label.findMany({
      where: {
        uid: userId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (e) {
    console.error(e);
    return [];
  }
};

const isLabelDuplucated = async (userId: number, labelName: string) => {
  const formattedName = formatLabelName(labelName);

  try {
    const isDuplicate = await prisma.label.findFirst({
      where: {
        uid: userId,
        name: formattedName,
      },
    });

    return !!isDuplicate;
  } catch (e) {
    console.error(e);
    return true;
  }
};

const createLabel = async (userId: number, labelName: string) => {
  const formattedName = formatLabelName(labelName);

  try {
    return await prisma.label.create({
      data: {
        uid: userId,
        name: formattedName,
      },
    });
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { getLabels, isLabelDuplucated, createLabel };

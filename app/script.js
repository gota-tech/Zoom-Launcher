const STORAGE_KEY = "zoom-one-click-meetings";

const state = {
  meetings: [],
  newestFirst: true,
  revealedPasscodes: new Set(),
};

const form = document.querySelector("#meeting-form");
const formTitle = document.querySelector("#form-title");
const saveButton = document.querySelector("#save-button");
const cancelEditButton = document.querySelector("#cancel-edit-button");
const meetingList = document.querySelector("#meeting-list");
const emptyState = document.querySelector("#empty-state");
const meetingCount = document.querySelector("#meeting-count");
const sortButton = document.querySelector("#sort-button");
const exportButton = document.querySelector("#export-button");
const importButton = document.querySelector("#import-button");
const clearAllButton = document.querySelector("#clear-all-button");
const importFile = document.querySelector("#import-file");
const template = document.querySelector("#meeting-template");

function createId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `meeting-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function loadMeetings() {
  try {
    const rawMeetings = localStorage.getItem(STORAGE_KEY);
    state.meetings = rawMeetings ? JSON.parse(rawMeetings) : [];
  } catch (error) {
    console.warn("Stored meetings could not be loaded.", error);
    state.meetings = [];
  }
}

function saveMeetings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.meetings));
}

function setEditMode(meeting) {
  form.elements.editingId.value = meeting.id;
  form.elements.title.value = meeting.title;
  form.elements.url.value = meeting.url;
  form.elements.meetingId.value = meeting.meetingId || "";
  form.elements.passcode.value = meeting.passcode || "";
  form.elements.notes.value = meeting.notes || "";
  formTitle.textContent = "会議を編集";
  saveButton.textContent = "更新";
  cancelEditButton.hidden = false;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearEditMode({ resetForm = true } = {}) {
  if (resetForm) {
    form.reset();
  }
  form.elements.editingId.value = "";
  formTitle.textContent = "会議を登録";
  saveButton.textContent = "保存";
  cancelEditButton.hidden = true;
}

function formatPasscode(meeting) {
  if (!meeting.passcode) {
    return "PW: 未登録";
  }

  if (state.revealedPasscodes.has(meeting.id)) {
    return `PW: ${meeting.passcode}`;
  }

  return "PW: ********";
}

function buildMeta(meeting) {
  const idText = meeting.meetingId ? `ID: ${meeting.meetingId}` : "ID: 未登録";
  return `${idText} / ${formatPasscode(meeting)}`;
}

function sortedMeetings() {
  return [...state.meetings].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return state.newestFirst ? bTime - aTime : aTime - bTime;
  });
}

function renderMeetings() {
  const meetings = sortedMeetings();
  meetingList.replaceChildren();
  meetingCount.textContent = `${meetings.length}件`;
  emptyState.classList.toggle("is-hidden", meetings.length > 0);
  sortButton.textContent = state.newestFirst ? "新しい順" : "古い順";
  exportButton.disabled = meetings.length === 0;
  clearAllButton.disabled = meetings.length === 0;

  for (const meeting of meetings) {
    const item = template.content.firstElementChild.cloneNode(true);
    const title = item.querySelector("h3");
    const meta = item.querySelector(".meeting-meta");
    const notes = item.querySelector(".meeting-notes");
    const joinButton = item.querySelector(".join-button");
    const revealButton = item.querySelector(".reveal-button");
    const copyButton = item.querySelector(".copy-button");
    const editButton = item.querySelector(".edit-button");
    const deleteButton = item.querySelector(".delete-button");

    title.textContent = meeting.title;
    meta.textContent = buildMeta(meeting);
    notes.textContent = meeting.notes || "メモなし";
    revealButton.disabled = !meeting.passcode;
    revealButton.textContent = state.revealedPasscodes.has(meeting.id) ? "PW隠す" : "PW表示";
    copyButton.disabled = !meeting.passcode;

    joinButton.addEventListener("click", () => {
      window.open(meeting.url, "_blank", "noopener,noreferrer");
    });

    revealButton.addEventListener("click", () => {
      if (state.revealedPasscodes.has(meeting.id)) {
        state.revealedPasscodes.delete(meeting.id);
      } else {
        state.revealedPasscodes.add(meeting.id);
      }
      renderMeetings();
    });

    copyButton.addEventListener("click", async () => {
      const copied = await copyText(meeting.passcode);
      copyButton.textContent = copied ? "コピー済み" : "失敗";
      setTimeout(() => {
        copyButton.textContent = "PWコピー";
      }, 1200);
    });

    editButton.addEventListener("click", () => {
      setEditMode(meeting);
    });

    deleteButton.addEventListener("click", () => {
      const shouldDelete = window.confirm(`「${meeting.title}」を削除しますか？`);
      if (!shouldDelete) {
        return;
      }

      state.meetings = state.meetings.filter((savedMeeting) => savedMeeting.id !== meeting.id);
      state.revealedPasscodes.delete(meeting.id);
      saveMeetings();
      renderMeetings();
    });

    meetingList.append(item);
  }
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const scratch = document.createElement("textarea");
    scratch.value = value;
    scratch.setAttribute("readonly", "");
    scratch.style.position = "fixed";
    scratch.style.opacity = "0";
    document.body.append(scratch);
    scratch.select();
    const copied = document.execCommand("copy");
    scratch.remove();
    return copied;
  }
}

function createMeeting(formData) {
  const now = new Date().toISOString();
  return {
    id: createId(),
    title: formData.get("title").trim(),
    url: normalizeUrl(formData.get("url")),
    meetingId: formData.get("meetingId").trim(),
    passcode: formData.get("passcode").trim(),
    notes: formData.get("notes").trim(),
    createdAt: now,
    updatedAt: now,
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const meeting = createMeeting(new FormData(form));
  const editingId = form.elements.editingId.value;

  try {
    new URL(meeting.url);
  } catch {
    window.alert("Zoom URLを確認してください。");
    return;
  }

  if (editingId) {
    state.meetings = state.meetings.map((savedMeeting) => {
      if (savedMeeting.id !== editingId) {
        return savedMeeting;
      }

      return {
        ...savedMeeting,
        title: meeting.title,
        url: meeting.url,
        meetingId: meeting.meetingId,
        passcode: meeting.passcode,
        notes: meeting.notes,
        updatedAt: meeting.updatedAt,
      };
    });
  } else {
    state.meetings.push(meeting);
  }

  saveMeetings();
  clearEditMode();
  renderMeetings();
});

form.addEventListener("reset", () => {
  setTimeout(() => clearEditMode({ resetForm: false }));
});

cancelEditButton.addEventListener("click", clearEditMode);

sortButton.addEventListener("click", () => {
  state.newestFirst = !state.newestFirst;
  renderMeetings();
});

exportButton.addEventListener("click", () => {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "zoom-one-click-launcher",
    version: 1,
    meetings: state.meetings,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `zoom-meetings-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

importButton.addEventListener("click", () => {
  importFile.click();
});

clearAllButton.addEventListener("click", () => {
  const shouldClear = window.confirm("保存済み会議をすべて削除しますか？この操作は元に戻せません。");
  if (!shouldClear) {
    return;
  }

  state.meetings = [];
  state.revealedPasscodes.clear();
  localStorage.removeItem(STORAGE_KEY);
  clearEditMode();
  renderMeetings();
});

importFile.addEventListener("change", async () => {
  const file = importFile.files[0];
  if (!file) {
    return;
  }

  try {
    const parsed = JSON.parse(await file.text());
    const importedMeetings = Array.isArray(parsed) ? parsed : parsed.meetings;
    if (!Array.isArray(importedMeetings)) {
      throw new Error("meetings array was not found");
    }

    const normalizedMeetings = importedMeetings.map(normalizeImportedMeeting);
    const shouldReplace = window.confirm("読み込んだ会議データで現在の一覧を置き換えますか？");
    if (!shouldReplace) {
      return;
    }

    state.meetings = normalizedMeetings;
    state.revealedPasscodes.clear();
    saveMeetings();
    clearEditMode();
    renderMeetings();
  } catch (error) {
    console.warn("Import failed.", error);
    window.alert("JSONファイルを読み込めませんでした。");
  } finally {
    importFile.value = "";
  }
});

function normalizeImportedMeeting(meeting) {
  const now = new Date().toISOString();
  const normalized = {
    id: meeting.id || createId(),
    title: String(meeting.title || "Untitled meeting").trim(),
    url: normalizeUrl(String(meeting.url || "")),
    meetingId: String(meeting.meetingId || "").trim(),
    passcode: String(meeting.passcode || "").trim(),
    notes: String(meeting.notes || "").trim(),
    createdAt: meeting.createdAt || now,
    updatedAt: meeting.updatedAt || now,
  };

  new URL(normalized.url);
  return normalized;
}

loadMeetings();
renderMeetings();

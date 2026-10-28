import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, type VueWrapper } from "@vue/test-utils";
import RegistrationPage from "@/components/pages/RegistrationPage.vue";
import eventConfig from "@/event.config";
import { mountWithApp } from "./setup";

function mockFetch(response: { ok?: boolean; status?: number; body: string }) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: response.ok ?? true,
    status: response.status ?? 200,
    text: () => Promise.resolve(response.body),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function fillValidForm(wrapper: VueWrapper) {
  await wrapper.find("#firstName").setValue("  Ana ");
  await wrapper.find("#lastName").setValue(" Novak ");
  await wrapper.find("#email").setValue(" ana@example.com ");
  await wrapper.find("#country").setValue("Slovenia");
  await wrapper.find("#roleFollower").setValue();
  await wrapper.find("#terms").setValue(true);
}

async function submit(wrapper: VueWrapper) {
  await wrapper.find("form").trigger("submit");
  await flushPromises();
}

describe("RegistrationPage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("shows errors and does not send anything when the form is empty", async () => {
    const fetchMock = mockFetch({ body: '{"ok":true}' });
    const { wrapper } = await mountWithApp(RegistrationPage);

    await submit(wrapper);

    expect(fetchMock).not.toHaveBeenCalled();
    for (const id of ["#firstName", "#lastName", "#email", "#terms"]) {
      expect(wrapper.find(id).classes()).toContain("is-invalid");
    }
  });

  it.each(["ana", "ana@", "ana@example", "ana @example.com"])(
    "rejects invalid email %j",
    async (email) => {
      const fetchMock = mockFetch({ body: '{"ok":true}' });
      const { wrapper } = await mountWithApp(RegistrationPage);
      await fillValidForm(wrapper);
      await wrapper.find("#email").setValue(email);

      await submit(wrapper);

      expect(fetchMock).not.toHaveBeenCalled();
      expect(wrapper.find("#email").classes()).toContain("is-invalid");
    }
  );

  it("requires a role", async () => {
    const fetchMock = mockFetch({ body: '{"ok":true}' });
    const { wrapper } = await mountWithApp(RegistrationPage);
    await fillValidForm(wrapper);
    (wrapper.vm as unknown as { role: string }).role = "";

    await submit(wrapper);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends trimmed data to the registration script", async () => {
    const fetchMock = mockFetch({ body: '{"ok":true}' });
    const { wrapper } = await mountWithApp(RegistrationPage);
    await fillValidForm(wrapper);
    await wrapper.find("#wsdcId").setValue(" 12345 ");
    await wrapper.find("#comment").setValue(" Hi! ");
    await wrapper.find("#newsletter").setValue(true);

    await submit(wrapper);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe(eventConfig.registrationScriptUrl);
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({
      firstName: "Ana",
      lastName: "Novak",
      email: "ana@example.com",
      country: "Slovenia",
      role: "Follower",
      wsdcId: "12345",
      partnerEmail: "",
      newsletter: true,
      acceptedTerms: true,
      comment: "Hi!",
    });
    expect(wrapper.find("form").exists()).toBe(false);
  });

  describe("registering with a partner", () => {
    it("requires a valid partner email", async () => {
      const fetchMock = mockFetch({ body: '{"ok":true}' });
      const { wrapper } = await mountWithApp(RegistrationPage);
      await fillValidForm(wrapper);
      await wrapper.find("#pairingPaired").setValue();
      await wrapper.find("#partnerEmail").setValue("not-an-email");

      await submit(wrapper);

      expect(fetchMock).not.toHaveBeenCalled();
      expect(wrapper.find("#partnerEmail").classes()).toContain("is-invalid");
    });

    it("sends the partner email", async () => {
      const fetchMock = mockFetch({ body: '{"ok":true}' });
      const { wrapper } = await mountWithApp(RegistrationPage);
      await fillValidForm(wrapper);
      await wrapper.find("#pairingPaired").setValue();
      await wrapper.find("#partnerEmail").setValue(" bor@example.com ");

      await submit(wrapper);

      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(body.partnerEmail).toBe("bor@example.com");
    });

    it("forgets the partner email when switching back to solo", async () => {
      const fetchMock = mockFetch({ body: '{"ok":true}' });
      const { wrapper } = await mountWithApp(RegistrationPage);
      await fillValidForm(wrapper);
      await wrapper.find("#pairingPaired").setValue();
      await wrapper.find("#partnerEmail").setValue("bor@example.com");
      await wrapper.find("#pairingSolo").setValue();

      expect(wrapper.find("#partnerEmail").exists()).toBe(false);
      await submit(wrapper);

      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(body.partnerEmail).toBe("");
    });
  });

  it.each([
    [
      "the server returns an error status",
      { ok: false, status: 500, body: "" },
    ],
    ["the script reports a failure", { body: '{"ok":false,"error":"Full"}' }],
    ["the response is not JSON", { body: "<html>oops</html>" }],
  ])("shows an error message when %s", async (_, response) => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    mockFetch(response);
    const { wrapper } = await mountWithApp(RegistrationPage);
    await fillValidForm(wrapper);

    await submit(wrapper);

    expect(wrapper.find(".alert-danger").text()).not.toBe("");
    expect(wrapper.find("form").exists()).toBe(true);
    expect(
      wrapper.find('button[type="submit"]').attributes()
    ).not.toHaveProperty("disabled");
  });

  it("disables the submit button while sending", async () => {
    let respond: (value: unknown) => void = () => undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise((resolve) => (respond = resolve)))
    );
    const { wrapper } = await mountWithApp(RegistrationPage);
    await fillValidForm(wrapper);

    await wrapper.find("form").trigger("submit");

    expect(wrapper.find('button[type="submit"]').attributes()).toHaveProperty(
      "disabled"
    );
    respond({
      ok: true,
      status: 200,
      text: () => Promise.resolve('{"ok":true}'),
    });
    await flushPromises();
    expect(wrapper.find("form").exists()).toBe(false);
  });
});

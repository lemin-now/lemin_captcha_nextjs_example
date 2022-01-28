// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default function handler(req, res) {
  const body = req.body;
  const response = axios
      .post("https://api.leminnow.com/captcha/v1/cropped/validate", {
        private_key: "YOUR_PRIVATE_KEY", // https://help.leminnow.com/knowledge/how-does-lemin-verify-a-captcha-answer
        challenge_id: body["challenge_id"],
        answer: body["answer"],
      })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        res.status(200).json(err.response.data);
      });
}

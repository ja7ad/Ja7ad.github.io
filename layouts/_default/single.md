# {{ .Title }}

- Author: {{ site.Params.author }}
- Date: {{ .Date.Format "2006-01-02" }}
- URL: {{ .Permalink }}
{{ if .Params.tags }}- Tags: {{ range .Params.tags }}#{{ . }} {{ end }}{{ end }}

---

{{ .RawContent }}

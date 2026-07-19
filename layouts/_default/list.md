# {{ .Title }}

> {{ site.Params.author }}'s Tech Blog & Posts
> Index URL: {{ .Permalink }}

---

## All Posts

{{ range .Pages }}
### [{{ .Title }}]({{ .Permalink }})
- Date: {{ .Date.Format "2006-01-02" }}
- Description: {{ .Description }}
{{ if .Params.tags }}- Tags: {{ range .Params.tags }}#{{ . }} {{ end }}{{ end }}
- Markdown URL: {{ .Permalink }}

{{ end }}
